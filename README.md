# Ticketing API

A REST API for support tickets. Express 5 + TypeScript + Prisma 7 + PostgreSQL, with JWT login and three roles: `ADMIN`, `AGENT`, `USER`.

## Install

You need Node.js, npm and Docker.

```bash
npm install
```

Create a `.env` file in the project root:

```dotenv
NODE_ENV=development
PORT=3000
JWT_SECRET=any-long-random-string
JWT_EXPIRES_IN=1h
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/DB_NAME
```

`DATABASE_URL` must match the credentials, port and database name in `compose.yaml`.

Then start the database, set it up and run the server:

```bash
npm run db:up             # start PostgreSQL in Docker
npm run db:generate       # generate the Prisma client
npm run db:migrate:dev    # create the tables
npm run db:seed           # add starter data (users, categories)
npm run dev               # start the server on http://localhost:3000
```

Other commands: `npm run db:down` (stop the database), `npm test` (needs a `.env.test` file), `npm run build` then `npm start` (production).

> If Prisma complains it can't find the datasource URL, your config file is named `prisma7.config.ts`. Prisma looks for `prisma.config.ts` by default, so either rename it or add `--config prisma7.config.ts` to the prisma scripts.

## How to use it

1. Log in with `POST /api/auth/login` to get a token.
2. Send that token on every other request as `Authorization: Bearer <token>`.

```bash
# 1. log in
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# 2. create a ticket (use the token from step 1)
curl -X POST http://localhost:3000/api/tickets \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"created_by_id":"x","category_id":"<category id>","title":"Printer broken","description":"The office printer is jammed again","priority":"HIGH"}'

# 3. list your tickets
curl "http://localhost:3000/api/tickets?status=OPEN&page=1&limit=10" \
  -H "Authorization: Bearer <token>"
```

There is no register endpoint, so users have to come from the seed script (or the `/api/users` routes, which I haven't seen).

## Endpoints

Base URL: `http://localhost:3000`


| Method | Path               | Auth  | Purpose                                   |
| ------ | ------------------ | ----- | ----------------------------------------- |
| GET    | `/health`          | no    | Checks the server and database connection |
| POST   | `/api/auth/login`  | no    | Log in, returns a token                   |
| POST   | `/api/auth/me`     | token | Returns the user the token belongs to     |
| POST   | `/api/tickets`     | token | Create a ticket                           |
| GET    | `/api/tickets`     | token | List tickets (paginated, filterable)      |
| GET    | `/api/tickets/:id` | token | Get one ticket                            |
| PATCH  | `/api/tickets/:id` | token | Update a ticket                           |
| DELETE | `/api/tickets/:id` | token | Delete a ticket                           |

`/api/users` is mounted in `app.ts`, but I wasn't given its router, so it isn't documented here.

### POST /api/auth/login

Body:

```json
{ "email": "user@example.com", "password": "at least 8 characters" }
```

Response `200`:

```json
{
  "data": { "id": "...", "name": "...", "email": "...", "role": "USER" },
  "token": "<jwt>"
}
```

This route has its own stricter rate limit.

### POST /api/auth/me

No body. Send the `Authorization: Bearer <token>` header. Response `200`:

```json
{ "data": { "id": "...", "email": "...", "role": "USER" } }
```

### POST /api/tickets

Body:


| Field            | Required       | Rules                                           |
| ---------------- | -------------- | ----------------------------------------------- |
| `title`          | yes            | 3 to 120 characters                             |
| `description`    | yes            | 10 to 5000 characters                           |
| `category_id`    | yes            | id of an existing category                      |
| `created_by_id`  | yes (see note) | any string, it is ignored                       |
| `priority`       | no             | `LOW`,`MEDIUM`,`HIGH`,`URGENT`(default`MEDIUM`) |
| `assigned_to_id` | no             | accepted but currently ignored                  |

The ticket's creator is always the logged-in user. Response `201`: `{ "data": { ...ticket } }`.

### GET /api/tickets

Query parameters, all optional:


| Param            | Meaning                                  |
| ---------------- | ---------------------------------------- |
| `page`           | page number, default 1                   |
| `limit`          | items per page, default 20, max 100      |
| `status`         | `OPEN`,`IN_PROGRESS`,`RESOLVED`,`CLOSED` |
| `priority`       | `LOW`,`MEDIUM`,`HIGH`,`URGENT`           |
| `created_by_id`  | filter by creator (only used for ADMIN)  |
| `assigned_to_id` | filter by assignee (ignored for AGENT)   |

What each role sees:

* **USER**: only tickets they created.
* **AGENT**: only tickets assigned to them.
* **ADMIN**: all tickets.

Response `200`:

```json
{
  "data": [ { "...ticket": "..." } ],
  "pagination": { "page": 1, "limit": 20, "total": 42, "totalPages": 3 }
}
```

### GET /api/tickets/:id

Returns `{ "data": { ...ticket } }`. You can open a ticket if you are an ADMIN, or you created it, or (as an AGENT) it is assigned to you. Otherwise you get `403`.

### PATCH /api/tickets/:id

Body: any of `title`, `description`, `priority` (at least one). Same access rule as GET. Response `200`: `{ "data": { ...updated ticket } }`.

Status, category and assignee cannot be changed through this endpoint.

### DELETE /api/tickets/:id

Same access rule as GET. Response `204` with no body.

## Roles


| Role    | Can do                                                                           |
| ------- | -------------------------------------------------------------------------------- |
| `USER`  | Create tickets; see, edit and delete their own                                   |
| `AGENT` | Create tickets; see, edit and delete tickets assigned to them or created by them |
| `ADMIN` | See, edit and delete any ticket                                                  |

## Errors

Errors come back as:

```json
{ "error": { "code": "FORBIDDEN", "message": "You lack permissions for this action." } }
```


| Status | Code                            | When                                     |
| ------ | ------------------------------- | ---------------------------------------- |
| 401    | `TOKEN_EXPIRED`/`TOKEN_INVALID` | Missing, bad or expired token            |
| 403    | `FORBIDDEN`                     | You are not allowed to touch that ticket |
| 404    | `NOT_FOUND`                     | Unknown route                            |
| 422    | `VALIDATION_ERROR`              | Body, params or query failed validation  |
| 429    |                                 | Rate limit hit                           |
| 500    | `UNKNOWN ERROR`                 | Anything not handled above               |

import { beforeAll, describe, expect, it } from "vitest";
import { api } from "./helper/api";

type User = {
    data: {
        id: string;
        name: string;
        email: string;
        role: string;
    }
    token: string;
};


const categories = ['cmvrwg6f70007h1ru86f6fwxq', 'cmvrwg6f70008h1rue617gcye', 'cmvrwg6f70009h1rucsoeutyk']



async function login(email: string, password: string) {
  const resopnse = await api
    .post("/api/auth/login")
    .send({ email, password });

  return resopnse.body as User;
}

let admin: User;

async function deleteTicket(email: string) {
  const response = await api
    .delete(`/api/tickets/${email}`)
    .set("Authorization", `Bearer ${admin.token}`);
  console.log(response.body.message);
}
async function deleteUser(id: string) {
  const response = await api
    .delete(`/api/users/${id}`)
    .set("Authorization", `Bearer ${admin.token}`);

  console.log(response.body.message);
}

describe("<-- endpoints test -->", () => {
  let agent: User;
  let user1: User;
  let user2: User;

  beforeAll(async () => {
    admin = await login("admin@example.com", "Admin123!");
    agent = await login("agent@example.com", "Agent123!");
    user1 = await login("user1@example.com", "User123!");
    user2 = await login("user2@example.com", "User234!");
  });

  // endpoint: 1
    it("checks api health", async () => {
        const response = await api
        .get('/health')

        expect(response.body).toStrictEqual({
            status: 'ok',
            database: 'connected'
        })
    })
    it("creates a ticket", async () => {
        const response = await api
            .post("/api/tickets/")
            .set("Authorization", `Bearer ${user1.token}`)
            .send({
                created_by_id: user1.data.id,
                category_id: categories[0],
                title: "title from new test",
                description: "description from new test",
                priority: "LOW",
            });

        expect(response.status).toBe(201);

        await deleteTicket(response.body.data.id);
    });
    it("views a ticket", async () => {
        const response = await api
            .post("/api/tickets/")
            .set("Authorization", `Bearer ${user1.token}`)
            .send({
                created_by_id: user1.data.id,
                category_id: categories[0],
                title: "title from new test",
                description: "description from new test",
                priority: "LOW",
            });

        expect(response.status).toBe(201);

        const viewresponse = await api
        .get(`/api/tickets/${response.body.data.id}`)
        .set("Authorization", `Bearer ${user1.token}`)
        
        expect(viewresponse.status).toBe(201)
        expect(viewresponse.body.data.title).toEqual("title from new test")

        await deleteTicket(response.body.data.id);
    });
    it("rejects to show a ticket to user2 created by other user1", async () => {
        const response = await api
            .post("/api/tickets/")
            .set("Authorization", `Bearer ${user1.token}`)
            .send({
                created_by_id: user1.data.id,
                category_id: categories[0],
                title: "title from new test",
                description: "description from new test",
                priority: "LOW",
            });

        expect(response.status).toBe(201);

        const viewresponse = await api
        .get(`/api/tickets/${response.body.data.id}`)
        .set("Authorization", `Bearer ${user2.token}`)
        
        expect(viewresponse.status).toBe(403)
        expect(viewresponse.body.error.code).toEqual("FORBIDDEN")

        await deleteTicket(response.body.data.id);
    });
    
    it("rejects deletion by users other than admin", async () => {
        const response = await api
            .post("/api/tickets/")
            .set("Authorization", `Bearer ${user1.token}`)
            .send({
                created_by_id: user1.data.id,
                category_id: categories[0],
                title: "title from new test",
                description: "description from new test",
                priority: "LOW",
            });

        expect(response.status).toBe(201);

        const delresponse = await api
        .delete(`/api/tickets/${response.body.data.id}`)
        .set("Authorization", `Bearer ${user2.token}`)
        
        expect(delresponse.status).toBe(403)
        expect(delresponse.body.error.code).toEqual("FORBIDDEN")

        await deleteTicket(response.body.data.id);
    })
    it("registers user", async() => {
        const response = await api
        .post('/api/users/register/')
        .set("Authorization", `Bearer ${admin.token}`)
        .send({
            name: "testuser",
            email: "user@user1.com",
            password: "12341234"
        })

        expect(response.status).toBe(201)

        await deleteUser(response.body.data.email)

    })
    it("deletes user", async() => {
        const response = await api
        .post('/api/users/register/')
        .set("Authorization", `Bearer ${admin.token}`)
        .send({
            name: "testuser",
            email: "user@user1.com",
            password: "12341234"
        })

        console.log(response.body, response.status)
        expect(response.status).toBe(201)

        const delresponse = await api
        .delete(`/api/users/${response.body.data.email}`)
        .set("Authorization", `Bearer ${admin.token}`)
        expect(delresponse.status).toBe(204)

        // await deleteUser(response.body.data.id)

    }) 
    it("only admin can delete or create user", async() => {
        const response = await api
        .post('/api/users/register/')
        .set("Authorization", `Bearer ${admin.token}`)
        .send({
            name: "testuser",
            email: "user@user1.com",
            password: "12341234"
        })

        console.log(response.body, response.status)
        expect(response.status).toBe(201)

        const delresponse = await api
        .delete(`/api/users/${response.body.data.email}`)
        .set("Authorization", `Bearer ${user1.token}`)
        expect(delresponse.status).toBe(403)

        await deleteUser(response.body.data.email)

        const userResponse = await api
        .post('/api/users/register/')
        .set("Authorization", `Bearer ${user1.token}`)
        .send({
            name: "testuser",
            email: "user@user1.com",
            password: "12341234"
        })
        expect(userResponse.status).toBe(403)

    }) 
});
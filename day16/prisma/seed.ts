import argon2 from 'argon2';
import { Role, TicketPriority, TicketStatus } from '../src/generated/enums.js';
import { PrismaClient, ticket } from '../src/generated/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { env } from '../src/config/env.js';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: env.DATABASE_URL })
})


type SeedUser = {
  email: string;
  name: string;
  password: string;
  role: Role;
};

type SeedTag = {
  name: string;
};

type SeedCat = {
  name: string;
};
type SeedTicket = {
    category_id: string
    created_by_id: string
    assigned_to_id: string
    title: string
    description: string
    priority: TicketPriority
    status: TicketStatus
};

const users: SeedUser[] = [
  {
    email: 'admin@example.com',
    name: 'Ameen Admin',
    password: 'Admin123!',
    role: Role.ADMIN
  },
  {
    email: 'agent@example.com',
    name: 'Gabe Agent',
    password: 'Agent123!',
    role: Role.AGENT
  },
  {
    email: 'user1@example.com',
    name: 'Uma User',
    password: 'User123!',
    role: Role.USER
  },
  {
    email: 'user2@example.com',
    name: 'Nora User',
    password: 'User234!',
    role: Role.USER
  }
];

const tags: SeedTag[] = [
    {
        name: "slack"
    },
    {
        name: "board"
    },
    {
        name: "services"
    }
]

const categories: SeedCat[] = [
    {
        name: "Hardware"
    },
    {
        name: "Application"
    },
    {
        name: "Kernel"
    }
]


async function seedUser(user: SeedUser) {
    const passwordHash: string = await argon2.hash(user.password)
    await prisma.users.upsert({
        create: {
            email: user.email,
            name: user.name,
            role: user.role,
            password: passwordHash
        },
        update: {
            name: user.name,
            role: user.role,
            password: passwordHash
        },
        where: {
            email: user.email
        }
    })
}


async function main() {
    for(const user of users) {
        await seedUser(user);
    }
    await prisma.tags.createMany({data: tags, skipDuplicates: true})
    await prisma.category.createMany({data: categories, skipDuplicates: true})
    const createdUsers = await prisma.users.findMany()
    const createdTags = await prisma.tags.findMany()
    const category = await prisma.category.findMany()
    const tickets: SeedTicket[] = [
        {
            category_id: category.find(c => c.name == 'Application')?.id as string,
            created_by_id: createdUsers.find(u => u.name == 'Ameen Admin')?.id as string,
            assigned_to_id: createdUsers.find(u => u.name == 'Gabe Agent')?.id as string,
            title: "UI nav is blinking upon scroll",
            description: "The UI nav of slack is blinking on scrolling down",
            priority: TicketPriority.LOW,
            status: TicketStatus.OPEN
        },
        {
            category_id: category.find(c => c.name == 'Kernel')?.id as string,
            created_by_id: createdUsers.find(u => u.name == 'Ameen Admin')?.id as string,
            assigned_to_id: createdUsers.find(u => u.name == 'Gabe Agent')?.id as string,
            title: "servicce restart problem",
            description: "Kernel level systems are not restarting",
            priority: TicketPriority.HIGH,
            status: TicketStatus.OPEN
        },
        {
            category_id: category.find(c => c.name == 'Hardware')?.id as string,
            created_by_id: createdUsers.find(u => u.name == 'Uma User')?.id as string,
            assigned_to_id: createdUsers.find(u => u.name == 'Gabe Agent')?.id as string,
            title: "old lap hardware",
            description: "the lap hardware is often old.",
            priority: TicketPriority.LOW,
            status: TicketStatus.OPEN
        },
        {
            category_id: category.find(c => c.name == 'Hardware')?.id as string,
            created_by_id: createdUsers.find(u => u.name == 'Nora User')?.id as string,
            assigned_to_id: createdUsers.find(u => u.name == 'Gabe Agent')?.id as string,
            title: "lap screen lines",
            description: "the screen keeps adding lights upon usage",
            priority: TicketPriority.MEDIUM,
            status: TicketStatus.IN_PROGRESS
        }
        
    ]
    await prisma.ticket.createMany({data: tickets, skipDuplicates: true})
    const createdTickets = await prisma.ticket.findMany();
    const getTicketId = (titleSubstring: string) => 
        createdTickets.find(t => t.title.includes(titleSubstring))?.id;
    
    const getTagId = (tagName: string) => 
        createdTags.find(tag => tag.name === tagName)?.id;
    
    const getUserId = (userName: string) => 
        createdUsers.find(u => u.name === userName)?.id;

    // 2. Seed Tag Connections (ticket_tags)
    const slackTagId = getTagId('slack');
    const boardTagId = getTagId('board');
    const servicesTagId = getTagId('services');

    const uiTicketId = getTicketId('UI nav is blinking');
    const kernelTicketId = getTicketId('servicce restart');

    if (uiTicketId && slackTagId && boardTagId) {
        await prisma.ticket_tags.createMany({
            data: [
                { ticket_id: uiTicketId, tag_id: slackTagId },
                { ticket_id: uiTicketId, tag_id: boardTagId }
            ],
            skipDuplicates: true
        });
    }

    if (kernelTicketId && servicesTagId) {
        await prisma.ticket_tags.createMany({
            data: [
                { ticket_id: kernelTicketId, tag_id: servicesTagId }
            ],
            skipDuplicates: true
        });
    }
    if (uiTicketId && kernelTicketId) {
        await prisma.comments.createMany({
            data: [
                {
                    ticket_id: uiTicketId,
                    author_id: getUserId('Gabe Agent') as string,
                    body: 'I noticed this happening on Chrome and Safari as well. Investigating.'
                },
                {
                    ticket_id: kernelTicketId,
                    author_id: getUserId('Ameen Admin') as string,
                    body: 'Please check the kernel logs under /var/log/syslog for more details.'
                }
            ]
        });
    }
    await prisma.$disconnect()
    console.log('Seeding completed successfully with tags and comments!');
}

await main()
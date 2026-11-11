import argon2 from 'argon2';
import { IssuePriority, IssueStatus, Role } from '../src/generated/enums.js';
import { PrismaClient } from '../src/generated/client.js';
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

type SeedProject = {
  name: string;
};

type SeedIssue = {
    created_by_id: string
    assigned_to_id: string
    project_id: string
    title: string
    description: string
    priority: IssuePriority
    status: IssueStatus
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


const projects: SeedProject[] = [
    {
        name: 'Pandora'
    },
    {
        name: 'Slack'
    },
    {
        name: 'Github'
    },
    {
        name: 'Go'
    },
    {
        name: 'Investors'
    },
]

async function seedProject(project:SeedProject) {
    await prisma.project.upsert({
        create: {
            name: project.name
        },
        update: {},
        where: {
            name: project.name
        }
    })
}

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
    for(const project of projects) {
        await seedProject(project);
    }
    const createdUsers = await prisma.users.findMany()
    const createdProjects = await prisma.project.findMany()
    const issues: SeedIssue[] = [
        {
            created_by_id: createdUsers.find(u => u.name == 'Ameen Admin')?.id as string,
            assigned_to_id: createdUsers.find(u => u.name == 'Gabe Agent')?.id as string,
            project_id: createdProjects.find(u => u.name == 'Pandora')?.id as string,
            title: "UI nav is blinking upon scroll",
            description: "The UI nav of slack is blinking on scrolling down",
            priority: IssuePriority.LOW,
            status: IssueStatus.OPEN
        },
        {
            created_by_id: createdUsers.find(u => u.name == 'Ameen Admin')?.id as string,
            assigned_to_id: createdUsers.find(u => u.name == 'Gabe Agent')?.id as string,
            project_id: createdProjects.find(u => u.name == 'Slack')?.id as string,
            title: "servicce restart problem",
            description: "Kernel level systems are not restarting",
            priority: IssuePriority.HIGH,
            status: IssueStatus.OPEN
        },
        {
            created_by_id: createdUsers.find(u => u.name == 'Uma User')?.id as string,
            assigned_to_id: createdUsers.find(u => u.name == 'Gabe Agent')?.id as string,
            project_id: createdProjects.find(u => u.name == 'Go')?.id as string,
            title: "old lap hardware",
            description: "the lap hardware is often old.",
            priority: IssuePriority.LOW,
            status: IssueStatus.OPEN
        },
        {
            created_by_id: createdUsers.find(u => u.name == 'Nora User')?.id as string,
            assigned_to_id: createdUsers.find(u => u.name == 'Gabe Agent')?.id as string,
            project_id: createdProjects.find(u => u.name == 'Github')?.id as string,
            title: "lap screen lines",
            description: "the screen keeps adding lights upon usage",
            priority: IssuePriority.MEDIUM,
            status: IssueStatus.IN_PROGRESS
        }
        
    ]
    await prisma.issue.createMany({data: issues, skipDuplicates: true})
    const createdIssues = await prisma.issue.findMany();
    const getIssueId = (titleSubstring: string) => 
        createdIssues.find(t => t.title.includes(titleSubstring))?.id;
    
    const getUserId = (userName: string) => 
        createdUsers.find(u => u.name === userName)?.id;

    await prisma.$disconnect()
    console.log('Seeding completed successfully with tags and comments!');
}

await main()
import type { Issue } from './types';
export const projects = [
    'Bamboo',
    'Pandora', 
    'Mickey',
    'Thesus',
    'WordMax',
    'JP Race',
    'Insurance'
]




export const issues: Issue[] = [
  {
    id: 1,
    title: 'Fix login validation',
    description: 'Users cannot log in with valid credentials.',
    project: 'Website Redesign',
    status: 'In Progress',
    priority: 'High',
    assignee: 'Akshay',
    dueDate: '2026-11-01'
  },
  {
    id: 2,
    title: 'Improve dashboard layout',
    description: 'Improve spacing and responsiveness.',
    project: 'Website Redesign',
    status: 'Todo',
    priority: 'Medium',
    assignee: 'Rahul',
    dueDate: '2026-11-05'
  },
  {
    id: 3,
    title: 'Update application icons',
    description: 'Replace outdated application icons.',
    project: 'Mobile Application',
    status: 'Done',
    priority: 'Low',
    assignee: 'Anu',
    dueDate: '2026-10-28'
  },
  {
    id: 4,
    title: 'Fix payment gateway error',
    description: 'Payment requests occasionally fail.',
    project: 'E-commerce Application',
    status: 'Todo',
    priority: 'High',
    assignee: 'John',
    dueDate: '2026-10-30'
  },
  {
    id: 5,
    title: 'Add profile editing',
    description: 'Allow users to update their profile.',
    project: 'Mobile Application',
    status: 'In Progress',
    priority: 'Medium',
    assignee: 'Rahul',
    dueDate: '2026-11-08'
  }
];
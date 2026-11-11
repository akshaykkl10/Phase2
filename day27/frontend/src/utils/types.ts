export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'Todo' | 'In Progress' | 'Done';
export type Role = 'ADMIN' | 'AGENT' | 'USER';

export interface UserSummary {
    name: string;
    email: string;
    role: Role;
}

export interface CategorySummary {
    name: string;
}

export interface Issue {
    id: string;
    category_id: string;
    created_by_id: string;
    assigned_to_id: string | null;
    title: string;
    description: string;
    priority: Priority;
    status: Status;
    createdat: string; // ISO 8601 date string
    updatedat: string; // ISO 8601 date string
    created_by: UserSummary;
    assigned_to: UserSummary | null;
    category: CategorySummary;
}

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface IssuesApiResponse {
    data: Issue[];
    pagination: PaginationMeta;
}
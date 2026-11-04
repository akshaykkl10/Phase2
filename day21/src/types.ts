export type IssuePriority = 'Low' | 'Medium' | 'High';

export type IssueStatus = 'Todo' | 'In Progress' | 'Done';

export type Issue = {
  id: number;
  title: string;
  description: string;
  project: string;
  status: IssueStatus;
  priority: IssuePriority;
  assignee: string;
  dueDate: string;
};
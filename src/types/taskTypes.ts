export type TaskType = {
  title: string;
  description?: string; // Optional field
  dueDate: string;
};


export interface CompleteTaskType extends TaskType {
  id: string;
  status:"pending" | "completed"
}
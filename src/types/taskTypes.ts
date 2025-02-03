export type TaskType = {
  title: string;
  description?: string; // Optional field
  dueDate: string;
};


export interface TaskWithIdType extends TaskType {
  id: string;
}
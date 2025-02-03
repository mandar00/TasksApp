import { CompleteTaskType } from "../types/taskTypes";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: { [key: string]: CompleteTaskType };
  updateTaskStatus: (
    taskId: string,
    taskStatus: "pending" | "completed"
  ) => void;
  deleteTask: (taskId: string) => void;
}
const TaskList = ({ tasks,updateTaskStatus ,deleteTask}: TaskListProps) => {
  return (
    <div className="w-[90%] h-[97%] rounded-md shadow-md p-[1vw] bg-white overflow-hidden">
      <header className="text-[2vw] font-bold border-b-1"> Tasks List</header>
      <div className="w-full h-full overflow-auto p-[1vw] flex flex-col">
        {tasks &&
          Object.values(tasks).length > 0 &&
          Object.values(tasks).map((task) => {
            return (
              <TaskItem
                key={task.id}
                task={task}
                updateTaskStatus={updateTaskStatus}
                deleteTask={deleteTask}
              />
            );
          })}
      </div>
    </div>
  );
};
export default TaskList;

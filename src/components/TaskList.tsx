import { Filter } from "lucide-react";
import { CompleteTaskType } from "../types/taskTypes";
import TaskItem from "./TaskItem";
import { useMemo } from "react";
import { getSortedTaskArray } from "../service/taskService";

interface TaskListProps {
  tasks: { [key: string]: CompleteTaskType };
  updateTaskStatus: (
    taskId: string,
    taskStatus: "pending" | "completed"
  ) => void;
  deleteTask: (taskId: string) => void;
}
const TaskList = ({ tasks, updateTaskStatus, deleteTask }: TaskListProps) => {
  const sortedTasksArray = useMemo(() => {
    return getSortedTaskArray(tasks);
  }, [tasks]);

  return (
    <div className="w-[90%] h-[97%] rounded-md shadow-md p-[1vw] pb-[2vw] bg-white overflow-hidden">
      <header className="text-[2vw] font-bold border-b-1 flex justify-between p-[1vw]">
        <p>Tasks List</p>
        <span className="flex items-center justify-center ">
          <Filter className="cursor-pointer" />
        </span>
      </header>
      <div className="w-full h-[95%] overflow-auto p-[1vw] flex flex-col ">
        <div>
          {sortedTasksArray &&
            sortedTasksArray.length > 0 &&
            sortedTasksArray.map((task) => {
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
    </div>
  );
};
export default TaskList;

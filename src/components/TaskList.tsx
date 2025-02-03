import { Filter } from "lucide-react";
import { CompleteTaskType } from "../types/taskTypes";
import TaskItem from "./TaskItem";
import { useMemo, useState } from "react";
import {
  getFilteredTaskArray,
  getSortedTaskArray,
} from "../service/taskService";

interface TaskListProps {
  tasks: { [key: string]: CompleteTaskType };
  updateTaskStatus: (
    taskId: string,
    taskStatus: "pending" | "completed"
  ) => void;
  deleteTask: (taskId: string) => void;
}
const TaskList = ({ tasks, updateTaskStatus, deleteTask }: TaskListProps) => {
  const [filter, setFilter] = useState<string>("all");

  const updateFilter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.target as HTMLElement;
    console.log(target.id);
    setFilter(target.id);
  };

  const sortedTasksArray = useMemo(() => {
    return getSortedTaskArray(tasks);
  }, [tasks]);

  const filteredTaskArray = useMemo(() => {
    return getFilteredTaskArray(sortedTasksArray, filter, "status");
  }, [filter, sortedTasksArray]);

  return (
    <div className="w-[90%] h-[97%] rounded-md shadow-md p-[1vw] pb-[2vw] bg-white overflow-hidden">
      <header className="text-[2vw] font-bold border-b-1 flex justify-between p-[1vw]">
        <p>Tasks List</p>
        <span className="flex items-center justify-center ">
          <div className="dropdown dropdown-left">
            <div tabIndex={0} role="button" className="btn m-1">
              <Filter />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <a onClick={updateFilter} id="all">
                  All
                </a>
              </li>
              <li>
                <a onClick={updateFilter} id="completed">
                  Completed
                </a>
              </li>
              <li>
                <a onClick={updateFilter} id="pending">
                  Pending
                </a>
              </li>
            </ul>
          </div>
        </span>
      </header>
      <div className="w-full h-[95%] overflow-y-auto p-[1vw] flex flex-col ">
        <div>
          {filteredTaskArray &&
            filteredTaskArray.length > 0 &&
            filteredTaskArray.map((task) => {
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

import { CompleteTaskType } from "../types/taskTypes";
import { Calendar, CircleCheckBig, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { formattedDate } from "../utils/dateTimeUtils";
interface TaskItemProps {
  task: CompleteTaskType;
  updateTaskStatus: (
    taskId: string,
    taskStatus: "pending" | "completed"
  ) => void;
  deleteTask: (taskId: string) => void;
}
const TaskItem = ({ task, updateTaskStatus, deleteTask }: TaskItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const isTaskStatusPending: boolean = useMemo(() => {
    return task.status === "pending";
  }, [task]);

  return (
    <div className="p-1">
      <div className="w-[95%%]   border border-gray-300 bg-blue-200 rounded-lg ">
        <div
          className="flex justify-between items-center p-4 cursor-pointer "
          onClick={() => setIsOpen(!isOpen)} // Toggle collapse when clicked on
        >
          <span className="text-[1.4vw] flex items-center gap-[1vw] overflow-auto">
            <CircleCheckBig
              className={` w-5
                ${isTaskStatusPending ? "text-black" : "text-green-500"}`
              }
              onClick={(e) => {
                e.stopPropagation(); // Prevent collapse from toggling on button click
                updateTaskStatus(
                  task.id,
                  isTaskStatusPending ? "completed" : "pending"
                );
              }}
            />
            {isTaskStatusPending ? (
              <div className="flex flex-col justify-center overflow-y-hidden break-words w-[90%]   ">
                <p className="h-fit text-[13px] md:text-[17px] text-left">{task.title}</p>
                <span className="flex gap-1 text-[10px] md:text-[12px] text-gray-500 items-center">
                  <Calendar className="w-3 md:w-3" />
                  {formattedDate(task.dueDate)}
                </span>
              </div>
            ) : (
              <s className="flex flex-col justify-center overflow-y-hidden break-words w-[90%]">
                <p className="h-fit text-left text-[13px] md:text-[17px]">{task.title}</p>
                <span className="flex gap-1 text-[10px] md:text-[12px] items-center">
                  <Calendar className="w-3 md:w-3" />
                  {formattedDate(task.dueDate)}
                </span>
              </s>
            )}
          </span>
          <div className="space-x-2">
            <Trash2
              className=" text-red-500 w-3.5 md:w-5"
              onClick={(e) => {
                e.stopPropagation();
                deleteTask(task.id);
              }}
            />
          </div>
        </div>

        {/* Collapse Content */}
        <div
          className={`break-words overflow-y-hidden text-left transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-fit p-4" : "max-h-0 p-0"
          }`}
        >
          <p className="h-fit text-[13px] md:text-[15px]">{task.description}</p>
        </div>
      </div>
    </div>
  );
};
export default TaskItem;

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
    <div className="p-4">
      <div className="border border-gray-300 bg-blue-200 rounded-lg">
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)} // Toggle collapse when clicked on
        >
          <span className="text-[1.4vw] flex items-center gap-[1vw]">
            <CircleCheckBig
              className={`${
                isTaskStatusPending ? "text-black" : "text-green-500"
              }`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent collapse from toggling on button click
                updateTaskStatus(
                  task.id,
                  isTaskStatusPending ? "completed" : "pending"
                );
              }}
            />
            {isTaskStatusPending ? (
              <p className="flex flex-col justify-center">
                {task.title}
                <span className="flex gap-1 text-[1vw] items-center">
                  <Calendar className="w-[1vw]" />
                  {formattedDate(task.dueDate)}
                </span>
              </p>
            ) : (
              <s className="flex flex-col justify-center">
                {task.title}
                <span className="flex gap-1 text-[1vw] items-center">
                  <Calendar className="w-[1vw]" />
                  {formattedDate(task.dueDate)}
                </span>
              </s>
            )}
          </span>
          <div className="space-x-2">
            <Trash2
              className=" text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                deleteTask(task.id);
              }}
            />
          </div>
        </div>

        {/* Collapse Content */}
        <div
          className={`overflow-hidden text-left transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[500px] p-4" : "max-h-0 p-0"
          }`}
        >
          <p>{task.description}</p>
        </div>
      </div>
    </div>
  );
};
export default TaskItem;

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import TaskForm from "../components/TaskForm";
import { TaskType, CompleteTaskType, TasksListType } from "../types/taskTypes";
import { createTask, fetchAllTasks } from "../service/taskService";
import { useUser } from "../context/User/userContext";
import Redirect from "../components/Redirect";
import LoginRedirect from "../assets/loginRedirect.svg";
import { useToasts } from "../hooks/useToasts";
import TaskList from "../components/TaskList";
import { copyDeep } from "../utils/generalUtils";
import { handleLocalstorage } from "../service/localstorageService";



const Tasks = () => {
  const { username } = useUser();
  const { addInfoToast, addDangerToast } = useToasts();
  const formRef = useRef<{ resetForm: () => void }>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState<TasksListType>({});
  const updateLocalStorage = handleLocalstorage(username, "data");

  const getAllTasks = async () => {
    try {
      const response = await fetchAllTasks(username);
      setTasks(response as TasksListType);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("Unexpected error:", error);
        addDangerToast("Something went wrong");
      }
    }
  };

  useEffect(() => {
    if (username) {
      // fetch all tasks and set Tasks state
      getAllTasks();
    }
  }, []);

  const toggleModal = (value: boolean | undefined = undefined) => {
    if (value === undefined) {
      setIsOpen((prevState) => !prevState);
    } else {
      setIsOpen(value);
    }
  };

  const onSubmit = async (data: TaskType) => {
    try {
      const task = (await createTask(username, data)) as CompleteTaskType;
      let newTaskList;

      setTasks((prevTasks) => {
        newTaskList = {
          ...prevTasks,
          [task.id]: task,
        };
        console.log(newTaskList)
        return newTaskList;
      });

      updateLocalStorage(newTaskList)
      formRef.current?.resetForm();
      setIsOpen(false);
      addInfoToast("Task added successfully");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
        addDangerToast(error.message);
      } else {
        console.error("Unexpected error:", error);
        addDangerToast("Something went wrong");
      }
    }
  };

  const updateTaskStatus = (
    taskId: string,
    taskStatus: "pending" | "completed"
  ) => {
    const taskListCopy: TasksListType = copyDeep(tasks);
    taskListCopy[taskId].status = taskStatus;
    updateLocalStorage(taskListCopy)
    setTasks(taskListCopy);
  };

  const deleteTask = (taskId: string) => {
    const taskListCopy: TasksListType = copyDeep(tasks);
    delete taskListCopy[taskId];
    updateLocalStorage(taskListCopy)
    setTasks(taskListCopy);
  };

  if (!username || username.length === 0) {
    return (
      <Redirect
        imagePath={LoginRedirect}
        redirectBtnText="Login page"
        redirectTo="/login"
        redirectMessage="Please Login to add tasks"
      />
    );
  }

  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <TaskList
          tasks={tasks}
          updateTaskStatus={updateTaskStatus}
          deleteTask={deleteTask}
        />
      </div>
      <button
        onClick={() => toggleModal(true)}
        className="btn btn-circle btn-info shadow-md fixed bottom-[2vw] right-[3vw] text-white"
      >
        +
      </button>
      <TaskForm
        ref={formRef}
        isOpen={isOpen}
        closeModal={toggleModal}
        onSubmit={onSubmit}
      />
    </>
  );
};
export default Tasks;

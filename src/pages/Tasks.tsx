import { useRef, useState } from "react";
import TaskForm from "../components/TaskForm";
import { TaskType } from "../types/taskTypes";
import { createTask } from "../service/taskService";
import { useUser } from "../context/User/userContext";
import Redirect from "../components/Redirect";
import LoginRedirect from "../assets/loginRedirect.svg"

const Tasks = () => {
  const { username } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const formRef = useRef<{ resetForm: () => void }>(null);

  const toggleModal = (value: boolean | undefined = undefined) => {
    if (value === undefined) {
      setIsOpen((prevState) => !prevState);
    } else {
      setIsOpen(value);
    }
  };

  const onSubmit = async(data: TaskType) => {
    try {
      setIsSubmitting(true);
      await createTask(username,data)
      formRef.current?.resetForm();
      setIsOpen(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
    console.log("Form Data:", data);
  };

  if(!username || username.length === 0){
    return(
      <Redirect  imagePath={LoginRedirect} redirectBtnText="Login page" redirectTo="/login" redirectMessage="Please Login to add tasks"/>
    )
  }
  return (
    <>
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
        isSubmitting={isSubmitting}
      />
    </>
  );
};
export default Tasks;

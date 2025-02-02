import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { TaskType } from "../types/taskTypes";

interface TaskFormProps {
  isOpen: boolean;
  onSubmit: (data: TaskType) => Promise<void>;
  closeModal: (value: boolean) => void;
  isSubmitting: boolean;
}

const TaskForm = forwardRef(
  ({ isOpen, closeModal, onSubmit, isSubmitting }: TaskFormProps, ref) => {
    const {
      register,
      handleSubmit,
      watch,
      reset,
      formState: { errors },
    } = useForm<TaskType>();

    useImperativeHandle(ref, () => ({
      resetForm: () => {
        reset();
      },
    }));

    // Watch title and dueDate to disable submit button if empty
    const title = watch("title");
    const dueDate = watch("dueDate");
    const today = new Date().toISOString().split("T")[0];

    return (
      <>
        <input
          type="checkbox"
          id="my-modal"
          className="modal-toggle"
          checked={isOpen}
          readOnly
        />

        <div className="modal">
          <div className="modal-box">
            <h2 className="text-xl font-bold">Create Task</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <input
                type="text"
                placeholder="Title"
                {...register("title", {
                  required: "Title is required",
                  pattern: {
                    value: /\S/,
                    message: "Title cannot be empty or just spaces",
                  },
                })}
                className="input input-bordered w-full"
              />
              {errors.title && (
                <p className="text-red-500">
                  {errors.title?.message?.toString()}
                </p>
              )}

              <textarea
                placeholder="Description"
                {...register("description")}
                className="textarea textarea-bordered w-full"
              />

              <input
                type="date"
                {...register("dueDate", {
                  required: "Due date is required",
                  validate: (value) =>
                    value >= today || "Due date must be in the future",
                })}
                className="input input-bordered w-full"
              />
              {errors.dueDate && (
                <p className="text-red-500">
                  {errors.dueDate.message?.toString()}
                </p>
              )}

              <div className="modal-action">
                <button
                  type="submit"
                  className="btn btn-info text-white"
                  disabled={!title || !dueDate || isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
                <button
                  type="button"
                  className="btn text-white btn-neutral"
                  onClick={() => {
                    reset();
                    closeModal(false);
                  }}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
);
export default TaskForm;

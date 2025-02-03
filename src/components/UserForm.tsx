import React, { forwardRef, useImperativeHandle, useRef } from "react";

type FormHandle = {
  reset: () => void;
};

type error = {
  isError: boolean;
  errorText: string;
};

interface UserFormProps {
  title: string;
  imagePath: string;
  redirectLink: React.ReactNode;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error: error;

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  submitBtnText?: string;
}
const UserForm = forwardRef<FormHandle, UserFormProps>(
  (
    {
      title,
      imagePath,
      submitBtnText = "",
      redirectLink,
      onChange,
      value,
      handleSubmit,
      error,
    }: UserFormProps,
    ref
  ) => {
    const formRef = useRef<HTMLFormElement>(null);

    // Expose reset function to the parent
    useImperativeHandle(ref, () => ({
      reset: () => {
        formRef.current?.reset(); // Reset the form
      },
    }));

    return (
      <>
        <div className="w-[70%] h-[80%] flex overflow-hidden rounded-xl shadow-md">
          <section className="w-[100%] md:w-[50%] bg-gray-50 p-[25px]">
            <div className="text-[30px] font-bold">{title}</div>
            {/* TODO implememt a config based input form */}
            <div className=" mt-[15%] ">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col space-y-[3vw] items-center"
              >
                <fieldset className="fieldset w-full flex flex-col justify-center items-center space-y-[1vw]">
                  <legend className="fieldset-legend text-center">
                    Username
                  </legend>
                  <input
                    type="text"
                    name="username"
                    {...(value !== undefined && { value })} // Controlled only if value is provided
                    {...(onChange !== undefined && { onChange })} // Controlled only if onChange is provided
                    className="input"
                    placeholder="Please enter your username"
                  />
                  <legend className="fieldset-legend text-center">
                    Password
                  </legend>
                  <input
                    type="password"
                    name="password"
                    {...(value !== undefined && { value })} // Controlled only if value is provided
                    {...(onChange !== undefined && { onChange })} // Controlled only if onChange is provided
                    className="input"
                    placeholder="Please Enter Password"
                  />
                </fieldset>
                <button
                  type="submit"
                  className="btn btn-info btn-wide btn-sm text-white"
                >
                  {submitBtnText || title}
                </button>
              </form>
              <p className="text-red-600  min-h-[30px] text-[12px]">{error.isError && error.errorText}</p>
              <p className="text-[15px]">{redirectLink}</p>
            </div>
          </section>
          <section className="w-[50%] bg-gray-50 hidden md:flex shadow-xs">
            <img className="h-full" src={imagePath} />
          </section>
        </div>
      </>
    );
  }
);
export default UserForm;

import { useRef, useState } from "react";
import UserForm from "../components/UserForm";
import { Link, useNavigate } from "react-router-dom";
import SignUpLogo from "../assets/SignUp2.svg";
import { getFormData } from "../utils/generalUtils";
import { signUpUser } from "../service/userService";
import { useUpdateUser } from "../context/User/userContext";

const SignUp = () => {
  const formRef = useRef<{ reset: () => void }>(null);
  const [error, setError] = useState({
    isError: false,
    errorText: "",
  });

  const navigate = useNavigate();
  const updateUser = useUpdateUser();

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = getFormData(e);
      const username = await signUpUser(formData);
      updateUser(username as string)
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
        setError({ isError: true, errorText: error.message });
        formRef.current?.reset();
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };
  return (
    <div className=" w-full h-full flex items-center justify-center">
      <UserForm
        ref={formRef}
        error={error}
        title="Sign Up"
        imagePath={SignUpLogo}
        handleSubmit={handleSubmit}
        redirectLink={
          <p className="mt-[1vw]">
            Already have an account <Link to="/login">Log In</Link>
          </p>
        }
      />
    </div>
  );
};
export default SignUp;

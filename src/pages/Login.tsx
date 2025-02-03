import UserForm from "../components/UserForm";
import loginImg from "../assets/login2.svg";
import { Link, useNavigate } from "react-router-dom";
import { getFormData } from "../utils/generalUtils";
import { useRef, useState } from "react";
import { loginInUser } from "../service/userService";
import { useUpdateUser } from "../context/User/userContext";

const Login = () => {
  const formRef = useRef<{ reset: () => void }>(null);
  const [error, setError] = useState({
    isError: false,
    errorText: "",
  });

  const navigate = useNavigate();
  const updateUser = useUpdateUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = getFormData(e);
      const username = await loginInUser(formData);
      updateUser(username as string)
      navigate("/")
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
    <div className=" w-full h-full bg-gray-100 flex items-center justify-center">
      <UserForm
        ref={formRef}
        error={error}
        title="Login"
        imagePath={loginImg}
        handleSubmit={handleSubmit}
        redirectLink={
          <p className="mt-[1vw]">
            Don't have an account <Link to="/signup">Sign up</Link>
          </p>
        }
      />
    </div>
  );
};
export default Login;

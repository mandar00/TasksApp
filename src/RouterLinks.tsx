import { Route, Routes } from "react-router-dom";
import Redirect from "./components/Redirect";
import Tasks from "./pages/Tasks";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import noMatchMd from "./assets/noMatchMd.svg";

const RouterLinks = () => {
  return (
    <Routes>
      <Route path="/" element={<Tasks />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="*"
        element={
          <Redirect
            imagePath={noMatchMd}
            redirectBtnText="Return to Home"
            redirectTo="/"
          />
        }
      />
    </Routes>
  );
};
export default RouterLinks;

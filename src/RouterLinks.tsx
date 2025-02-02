import { Route, Routes } from "react-router-dom";
import NoMatch from "./components/NoMatch";
import Tasks from "./pages/Tasks";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

const RouterLinks = () => {
  return (
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NoMatch/>} />
      </Routes>
  );
};
export default RouterLinks;

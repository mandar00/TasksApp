import { Link, useLocation } from "react-router-dom";
import tasksLogo from "../assets/tasks.webp";
const Header = () => {
  const location = useLocation(); // Get current route
  return (
    <nav className="w-full h-[3vw] md:h-[4vw] shadow-md fixed top-0 px-[2vw] flex items-center justify-between ">
      <Link to="/" className="w-[2vw] h-[2vw] flex items-center gap-2">
        <img className="w-full h-full " src={tasksLogo} alt="TaskLy" />
        <p className="font-bold text-sky-600 text-[1.5vw] ">Taskly</p>
      </Link>
      {
        // dont show login or logout button on login and signin page 
        (location.pathname !== "/login") &&
        <div>
        <Link to="/login">
          <button className="btn btn-info btn-sm text-white text-[1vw] outline-0">
            Login In
          </button>
        </Link>
      </div>
      }
    </nav>
  );
};
export default Header;

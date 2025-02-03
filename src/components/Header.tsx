import { Link, useLocation } from "react-router-dom";
import tasksLogo from "../assets/tasks.webp";
const Header = () => {
  const location = useLocation(); // Get current route
  return (
    <nav className="w-full h-[50px] shadow-md fixed bg-white top-0 px-[2vw] flex items-center justify-between ">
      <Link to="/" className="w-[20px] h-[20px] md:w-[25px] md:h-[25px] flex items-center gap-2">
        <img className="w-full h-full " src={tasksLogo} alt="TaskLy" />
        <p className="font-bold text-sky-600 md:text-[25px] text-[20px] ">Taskly</p>
      </Link>
      {
        // dont show login or logout button on login and signin page 
        (location.pathname !== "/login") &&
        <div>
        <Link to="/login">
          <button className="btn btn-info btn-xs md:btn-sm  text-white text-[20px] outline-0">
            Login In
          </button>
        </Link>
      </div>
      }
    </nav>
  );
};
export default Header;

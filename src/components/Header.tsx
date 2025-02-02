import tasksLogo from "../assets/tasks.webp";
const Header = () => {
  return (
    <nav className="w-full h-[3vw] md:h-[5vw] shadow-md fixed top-0 px-[2vw] flex items-center justify-between ">
      <div className="w-[3vw] h-[3vw] flex items-center gap-2">
        <img className="w-full h-full " src={tasksLogo} alt="TaskLy" />
        <p className="font-bold text-[2vw]">Taskly</p>
      </div>
      <div>
        
      </div>
    </nav>
  );
};
export default Header;

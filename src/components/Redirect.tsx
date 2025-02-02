import { Link } from "react-router-dom";
interface RidirectProps {
  imagePath: string;
  redirectBtnText: string;
  redirectTo: string;
}

const Redirect = ({ imagePath, redirectBtnText, redirectTo }:RidirectProps) => {
  return (
    <div className="w-full h-full">
      <div className="h-[80%] ">
        <img className="w-full h-full " src={imagePath} alt="404" />
      </div>
      <Link  to={redirectTo}>
        <button className="btn btn-info mt-[2vw]">{redirectBtnText}</button>
      </Link>
    </div>
  );
};
export default Redirect;

import noMatchMd from "../assets/noMatchMd.svg"

const NoMatch = () => {
  return (
    <div className="w-full h-full">
      <img
        className="w-full h-full "
        src={noMatchMd}
        alt="404"
      />
    </div>
  );
};
export default NoMatch;

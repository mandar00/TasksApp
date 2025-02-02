import "./App.css";
import Header from "./components/Header";
import UserProvider from "./context/User/UserProvider";
import RouterLinks from "./RouterLinks";

function App() {
  return (
    <div className="w-full h-screen pt-[3vw] md:pt-[5vw]">
      <UserProvider>
        <Header />
        <RouterLinks />
      </UserProvider>
    </div>
  );
}

export default App;

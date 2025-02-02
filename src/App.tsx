import "./App.css";
import CustomSnackbar from "./components/CustomSnackbar";
import Header from "./components/Header";
import RootContextProvider from "./RootContextProvider";
import RouterLinks from "./RouterLinks";

function App() {
  return (
    <div className="w-full h-screen pt-[3vw] md:pt-[5vw]">
      <RootContextProvider>
        <Header />
        <RouterLinks />
        <CustomSnackbar/>
      </RootContextProvider>
    </div>
  );
}

export default App;

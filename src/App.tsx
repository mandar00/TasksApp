import "./App.css";
import CustomSnackbar from "./components/CustomSnackbar";
import Header from "./components/Header";
import RootContextProvider from "./RootContextProvider";
import RouterLinks from "./RouterLinks";

function App() {
  return (
    <div className="w-full h-screen pt-[50px] min-w-[350px] bg-gray-50">
      <RootContextProvider>
        <Header />
        <RouterLinks />
        <CustomSnackbar/>
      </RootContextProvider>
    </div>
  );
}

export default App;

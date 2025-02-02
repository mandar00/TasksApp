import { Provider } from "react-redux";
import store from "./store/store";
import UserProvider from "./context/User/UserProvider";

const RootContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <UserProvider>{children}</UserProvider>
    </Provider>
  );
};
export default RootContextProvider;

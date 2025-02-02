import{  useContext,createContext } from "react";

type userContextType = {
  username: string;
};

type UserUpdateContextType = (newUsername: string) => void;


export const UserContext = createContext<userContextType>({username:""});
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useTheme must be used within UserProvider");
  }
  return context;
};

export const UserUpdateContext = createContext<UserUpdateContextType>(()=>{});
export const useUpdateUser = () => {
  const context = useContext(UserUpdateContext);
  if (!context) {
    throw new Error("useTheme must be used within UserProvider");
  }
  return context;
};



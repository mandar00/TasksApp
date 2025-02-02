import React, {
  useCallback,
  useMemo,
  useState,
} from "react";
import { UserContext, UserUpdateContext } from "./userContext";


const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string>("");

  const userValue = useMemo(() => {
    return { username };
  }, [username]);

  const updateUserData =useCallback((username :string)=>{
    console.log("from context",username)
    setUsername(username)
  },[])

  return (
    <UserContext.Provider value={userValue}>
      <UserUpdateContext.Provider value={updateUserData}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
};

export default UserProvider;

interface userFormProps {
  [key: string]: FormDataEntryValue
}

export const loginInUser = (formData: userFormProps) => {
  const { username, password } = formData
  return new Promise((resolve, reject) => {
    //check if username or password is empty
    if ((username as string).length === 0 || (password as string).length === 0) {
      reject(new Error("Please enter valid username and password"))
    }
    const user = getUser(username as string);
    if (user) {
      //check if username and password are valid
      if (username === user?.username && password === user?.password) {
        localStorage.setItem(username as string, JSON.stringify({ ...user, isLoggedIn: true }))
        resolve("Logged in successfully")
      } else {
        reject(new Error("Invalid Username or password"))
      }
    } else {
      //reject the promise as user does not exist
      reject(new Error("User does't exist. Please sign up"))
    }
  })

}

export const signUpUser = (formData: userFormProps) => {
  const { username, password } = formData;

  return new Promise((resolve, reject) => {
    if(isLocalStorageFull()){
      reject(new Error("Localstorage is full!!"))
    }
    if ((username as string).length === 0 || (password as string).length === 0) {
      reject(new Error("Please enter valid username and password"))
    }
    const user = getUser(username as string);
    if (user === null) {
      const user = {
        username: username as string,
        password: password as string,
        data: [],
        isLoggedIn: true
      }
      localStorage.setItem(username as string, JSON.stringify(user))
      resolve("Signed up successfully")
    } else {
      //reject the promise as user already exist
      reject(new Error("Username already exists."))
    }
  })
}


const isLocalStorageFull=()=>{
  try {
    const testKey = "__test_key__";
    localStorage.setItem(testKey, "test"); // Try setting a small item
    localStorage.removeItem(testKey); // Cleanup
    return false; // Not full
  } catch (e) {
    return e instanceof DOMException && e.code === 22; // Quota exceeded
  }
}

const getUser = (username: string) => {
  const userData = localStorage.getItem(username);
  return userData ? JSON.parse(userData) : null;

}
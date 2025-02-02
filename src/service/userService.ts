interface LoginUserProps {
  [key: string]: FormDataEntryValue
}
export const loginInUser = (formData: LoginUserProps) => {
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


const getUser = (username: string) => {
  const userData = localStorage.getItem(username);
  return userData ? JSON.parse(userData) : null;

}
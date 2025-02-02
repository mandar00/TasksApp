import { TaskType } from "../types/taskTypes"
import { getUser, isLocalStorageFull } from "./userService"


export const createTask = (username: string, taskData: TaskType) => {
  return new Promise((resolve, reject) => {
    if (isLocalStorageFull()) {
      reject(new Error("Localstorage is full!!"))
    }

    const user = getUser(username)
    if(user){
      user.data.push(taskData)
      localStorage.setItem(username,JSON.stringify(user))
      resolve("Task Added Successfully")
    }else{
      reject(new Error("No Logged in user found. Please Login!"))
    }
  })

}
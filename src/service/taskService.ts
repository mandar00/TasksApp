import { TaskType } from "../types/taskTypes"
import { genrateRandomId } from "../utils/generalUtils"
import { getUser, isLocalStorageFull } from "./userService"


export const createTask = (username: string, taskData: TaskType) => {
  return new Promise((resolve, reject) => {
    if (isLocalStorageFull()) {
      reject(new Error("Localstorage is full!!"))
    }
    const user = getUser(username)
    if (user !== null) {
      const taskId =  genrateRandomId()
      const newTask =  { ...taskData, id: taskId,status:"pending" }
      user.data[taskId] = newTask
      resolve(newTask)
    } else {
      reject(new Error("User not found. Please Login!"))
    }
  })

}


export const fetchAllTasks = (username: string) => {
  return new Promise((resolve, reject) => {
    const user = getUser(username)
    if (user !== null) {
      resolve(user?.data)
    } else {
      reject(new Error("User not found. Please Login!"))
    }
  })
}
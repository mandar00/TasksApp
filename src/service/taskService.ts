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
      user.data.push({ ...taskData, id: genrateRandomId() })
      localStorage.setItem(username, JSON.stringify(user))
      resolve("Task Added Successfully")
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
import { CompleteTaskType, TasksListType, TaskType } from "../types/taskTypes"
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


export const getSortedTaskArray=(taskObj:TasksListType)=>{
  const tasksArray = Object.values(taskObj);
  return tasksArray.sort((a,b)=> new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime() )

}


export const getFilteredTaskArray=(taskArray:CompleteTaskType[],filter:string,key:keyof CompleteTaskType)=>{
  if(filter === "all") return taskArray
  return taskArray.filter((task:CompleteTaskType)=>{
    return  task[key] === filter
  })
}
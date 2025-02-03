
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUser } from "./userService"

export const handleLocalstorage = (key: string, valueToUpdate?: string) => {
  // ?? using updatelocastorage function  instead of a customlike useLocalStorage to sync tasks whenever they update
  // ?? to prevent tasks reset to {} when the tasks state initializes 
  const updateLocalStorage = (value: any) => {
    if (key) {
      let user = getUser(key)
      if (valueToUpdate && user && valueToUpdate in user) {
        user[valueToUpdate] = value
      } else {
        user = value
      }
      console.log("updating Localstorage")
      localStorage.setItem(key, JSON.stringify(user))
    }
  }

  return updateLocalStorage

}
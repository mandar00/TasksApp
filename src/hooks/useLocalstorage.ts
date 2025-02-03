/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react"
import { getUser } from "../service/userService"

export const useLocalstorage=(value:any,key:string,valueToUpdate?:string)=>{
  useEffect(()=>{
    let user = getUser(key)
    if(valueToUpdate && user && valueToUpdate in user){
      user[valueToUpdate]=value
    }else{
      user = value
    }
    console.log("updating Localstorage")
    localStorage.setItem(key,JSON.stringify(user))
  },[value])

}
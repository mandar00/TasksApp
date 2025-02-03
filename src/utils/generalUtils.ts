/* eslint-disable @typescript-eslint/no-explicit-any */
export const getFormData=(e: React.FormEvent<HTMLFormElement>)=>{
  const form = new FormData(e.currentTarget);
  return Object.fromEntries(form.entries());
}

export const genrateRandomId=()=>{
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}


export const  copyDeep=(value:any)=>{
  return JSON.parse(JSON.stringify(value))
}


export function truncateString(str:string, maxLength = 100) {
  return `${str.length > maxLength ? str.slice(0, maxLength) + "..." : str}`;
}
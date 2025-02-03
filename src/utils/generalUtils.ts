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
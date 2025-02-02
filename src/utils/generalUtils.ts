export const getFormData=(e: React.FormEvent<HTMLFormElement>)=>{
  const form = new FormData(e.currentTarget);
  return Object.fromEntries(form.entries());
}
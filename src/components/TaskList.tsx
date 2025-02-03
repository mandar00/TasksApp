import { TaskWithIdType } from "../types/taskTypes"

interface TaskListProps{
  tasks:TaskWithIdType[]
}
const TaskList=({tasks}:TaskListProps) =>{
  console.log(tasks)
return(
    <div className="w-[90%] h-[97%] bg-blue-800 p-[1vw] ">
      <header className="text-[2vw] font-bold border-b-1"> Tasks List</header>
      <div>

      </div>
    </div>)
}
export default TaskList
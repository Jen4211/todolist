
import { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TaskType, Todolist } from './Todolist';

export type FilterValueType = 'all' | 'active' | 'completed';



function App() {
let[tasks, setTasks] = useState<Array<TaskType>>( [
    {id: v1(), title: "Css", isDone: true },
    {id: v1(), title: "Js", isDone: true },
    {id: v1(), title: "React", isDone: false },
    {id: v1(), title: "act", isDone: true },
    {id: v1(), title: "Re", isDone: false },
    
  ])
let[filter, setFilter] = useState<FilterValueType>("all");
 
let taskForTodolist = tasks;
if(filter === "active") {
  taskForTodolist = tasks.filter(t => t.isDone === false)
}
if(filter === "completed") {
  taskForTodolist = tasks.filter(t => t.isDone === true)
}

const addTask = (title: string) => {
  let task = {id: v1(), title: title, isDone: false}
  let newTask = [task, ...tasks]
  setTasks(newTask)
}

  const removeTasks = (id:string) => {
    let filteredTasks = tasks.filter(t => t.id !== id)
    setTasks(filteredTasks);
  }
  const changeFilter = (value:FilterValueType) => {
    setFilter(value);
  }

  return (
    <div className='App'>
      <Todolist title={"What to learn"} 
      tasks={taskForTodolist} 
      removeTask={removeTasks}
      changeFilter={changeFilter}
      addTask={addTask}/>
    </div>
  );
}



export default App;

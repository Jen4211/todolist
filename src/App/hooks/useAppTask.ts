import { useState } from "react";
import { v1 } from "uuid";
import { TaskStateType, TodolistType } from "../App";
import { todolistID1, todolistID2 } from "../id-utils";

export const useAppTask = () => {
    
  
    let [tasks, setTasks] = useState<TaskStateType>({
      [todolistID1]: [
        { id: v1(), title: "Css", isDone: true },
        { id: v1(), title: "Js", isDone: true },
        { id: v1(), title: "React", isDone: false }
      ],
      [todolistID2]: [
        { id: v1(), title: "act", isDone: true },
        { id: v1(), title: "Re", isDone: false }
      ]
    })
     
      const addTask = (title: string, todolistId: string) => {
        let task = { id: v1(), title: title, isDone: false };
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({ ...tasks })
      }
      const removeTasks = (id: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id)
        setTasks({ ...tasks });
      }
      const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id);
        if (task) {
          task.isDone = isDone;
          setTasks({ ...tasks })
        }
      }
      const changeTitleStatus = (id: string, newTitle: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId];
        let task = todolistTasks.find(t => t.id === id);
        if (task) {
          task.title = newTitle;
          setTasks({ ...tasks })
        }
    
      }
      const removeTaskaForTodolist = (id:string) => {
        delete tasks[id];
        setTasks({ ...tasks })
      }
      const addTasksForTodolist = (newTodolistId:string) => {
        setTasks({ ...tasks, [newTodolistId]: [] })
      }
    return {
        tasks,
        setTasks,
        addTask,
        removeTasks,
        changeTaskStatus,
        changeTitleStatus,
        removeTaskaForTodolist,
        addTasksForTodolist
    }
}
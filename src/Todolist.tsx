
import { useCallback } from "react";
import { FilterValueType } from "./App/App";

import EditableSpan from "./EditableSpan/EditableSpan";
import { Button, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import React from "react";
import { Task } from "./Task";
import AddItemForm from "./AddItemForm/AddItemForm";

export type TasksType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  id: string
  title: string
  tasks: Array<TasksType>
  removeTask: (id: string, todolistId: string) => void
  changeFilter: (value: FilterValueType, id: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
  filter: FilterValueType
  removeTodolist: (todolistId: string) => void
  ChangeTodolistTitle: (todolistId: string, newTitle: string) => void
  changeTitleStatus: (id: string, newTitle: string, todolistId: string) => void
}




export const Todolist = React.memo((props: PropsType) => {

  const addTask = useCallback((title: string) => {
    props.addTask(title, props.id)
  }, [props.addTask, props.id])

  const onAllClikHendler = useCallback(() => {
    props.changeFilter("all", props.id)
  }, [props.changeFilter, props.id])

  const onActiveClikHendler = useCallback(() => {
    props.changeFilter("active", props.id)
  }, [props.changeFilter, props.id])

  const onCompletedClikHendler = useCallback(() => {
    props.changeFilter("completed", props.id)
  }, [props.changeFilter, props.id])

  const removeTodolist = () => {
    props.removeTodolist(props.id)
  }
  const ChangeTodolistTitle = useCallback((newTitle: string) => {
    props.ChangeTodolistTitle(props.id, newTitle)
  }, [props.ChangeTodolistTitle, props.id])

  let tasksForTodolist = props.tasks;

  if (props.filter === "active") {
   
    tasksForTodolist = props.tasks.filter(el => el.isDone === false)
  }
  if (props.filter === "completed") {
    
    tasksForTodolist = props.tasks.filter(el => el.isDone === true)
  }
  return (
    <div>

      <h3>
        <EditableSpan title={props.title} onChange={ChangeTodolistTitle} />
        <IconButton onClick={removeTodolist}>
          <Delete />
        </IconButton>
        {/* <button onClick={removeTodolist}>✖️</button> */}
      </h3>
      <AddItemForm addTask={addTask} />

      <div>
        {tasksForTodolist.map(t =>
          <Task task={t}
            changeTaskStatus={props.changeTaskStatus}
            changeTitleStatus={props.changeTitleStatus}
            removeTask={props.removeTask}
            key={t.id}
            todolistId={props.id} />
        )}
      </div>
      <div>
        <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
          onClick={onAllClikHendler}
          color={"inherit"}>All</Button>
        <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
          onClick={onActiveClikHendler}
          color={"primary"}>Active</Button>
        <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
          onClick={onCompletedClikHendler}
          color={"secondary"}>Completed</Button>
      </div>
    </div>
  )
})





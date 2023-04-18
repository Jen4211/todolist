
import { ChangeEvent } from "react";
import { FilterValueType } from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string, todolistId: string) => void
  changeFilter: (value: FilterValueType, id: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
  filter: FilterValueType
  removeTodolist: (todolistId: string) => void
  ChangeTodolistTitle: (todolistId: string, newTitle: string) => void
  changeTitleStatus: (id:string, newTitle: string, todolistId: string) => void
}




export function Todolist(props: PropsType) {

  const addTask = (title: string) => {
    props.addTask(title, props.id)
  }

  const onAllClikHendler = () => {
    props.changeFilter("all", props.id)
  }
  const onActiveClikHendler = () => {
    props.changeFilter("active", props.id)
  }
  const onCompletedClikHendler = () => {
    props.changeFilter("completed", props.id)
  }
  const removeTodolist = () => {
    props.removeTodolist(props.id)
  }
  const ChangeTodolistTitle = (newTitle: string) => {
    props.ChangeTodolistTitle(props.id, newTitle)
  }
  return (
    <div>

      <h3>
      <EditableSpan title={props.title} onChange={ChangeTodolistTitle}/>
      <IconButton onClick={removeTodolist}>
        <Delete />
      </IconButton>
        {/* <button onClick={removeTodolist}>✖️</button> */}
      </h3>
      <AddItemForm addTask={addTask} />

      <ul>
        {props.tasks.map(t => {
          const onClikHendler = () => {
            props.removeTask(t.id, props.id)
          }
          const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            let newDoneValue = event.currentTarget.checked;
            props.changeTaskStatus(t.id, newDoneValue, props.id)
          }
          const onChangeTitleHendler = (newTitle: string) => {
            props.changeTitleStatus(t.id, newTitle, props.id)
          }
          return (
            <li key={t.id}
              className={t.isDone ? 'is-done' : ''}>
              <input type="checkbox"
                checked={t.isDone}
                onChange={onChangeHandler}
              />
              <EditableSpan title={t.title} onChange={onChangeTitleHendler} />
              <button onClick={onClikHendler}>✖️</button>
            </li>
          )
        })}
      </ul>
      <div>
        <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClikHendler}>All</button>
        <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClikHendler}>Active</button>
        <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClikHendler}>Completed</button>
      </div>
    </div>
  )
}

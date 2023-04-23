
import { ChangeEvent } from "react";
import { FilterValueType } from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import { Button, Checkbox, IconButton } from "@mui/material";
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
  changeTitleStatus: (id: string, newTitle: string, todolistId: string) => void
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
        <EditableSpan title={props.title} onChange={ChangeTodolistTitle} />
        <IconButton onClick={removeTodolist}>
          <Delete />
        </IconButton>
        {/* <button onClick={removeTodolist}>✖️</button> */}
      </h3>
      <AddItemForm addTask={addTask} />

      <div>
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
            <div key={t.id}
              className={t.isDone ? 'is-done' : ''}>
              <Checkbox 
                checked={t.isDone}
                color="primary"
                onChange={onChangeHandler}
              />
              <EditableSpan title={t.title} onChange={onChangeTitleHendler} />
              <IconButton onClick={onClikHendler}>
                <Delete />
              </IconButton>
            </div>
          )
        })}
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
}

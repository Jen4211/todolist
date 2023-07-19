import { Delete } from "@mui/icons-material"
import { Checkbox, IconButton } from "@mui/material"
import React, { useCallback } from "react"
import { ChangeEvent } from "react"
import EditableSpan from "./EditableSpan/EditableSpan"
import { TasksType } from "./Todolist"

type TaskPropsType = {
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTitleStatus: (id: string, newTitle: string, todolistId: string) => void
    task: TasksType
    todolistId: string
  }

export const Task = React.memo( (props: TaskPropsType) => {
    const onClikHendler = () => {
      props.removeTask(props.task.id, props.todolistId)
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      let newDoneValue = event.currentTarget.checked;
      props.changeTaskStatus(props.task.id, newDoneValue, props.todolistId)
    }
    const onChangeTitleHendler = useCallback((newTitle: string) => {
      props.changeTitleStatus(props.task.id, newTitle, props.todolistId)
    }, [props.changeTitleStatus, props.task.id, props.todolistId])
    return (
      <div key={props.task.id}
        className={props.task.isDone ? 'is-done' : ''}>
        <Checkbox
          checked={props.task.isDone}
          color="primary"
          onChange={onChangeHandler}
        />
        <EditableSpan title={props.task.title} onChange={onChangeTitleHendler} />
        <IconButton onClick={onClikHendler}>
          <Delete />
        </IconButton>
      </div>
    )
  })
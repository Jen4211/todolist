
import { ChangeEvent, useState, KeyboardEvent } from "react";
import { FilterValueType } from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id:string)=> void
    changeFilter: (value:FilterValueType)=> void
    addTask: (title: string)=> void
}



export function Todolist(props: PropsType) {

let [title, setTitle] = useState('');

const addTask = () => {
  props.addTask(title);
  setTitle('');
}
const onChangeHendler = (event: ChangeEvent<HTMLInputElement>) => {
  setTitle(event.currentTarget.value)
}
const onKeyPressHendler = (event: KeyboardEvent<HTMLInputElement>) => {
  if(event.key === 'Enter') {
    addTask()
  }
}
const onAllClikHendler = () => {
  props.changeFilter("all")
}
const onActiveClikHendler = () => {
  props.changeFilter("active")
}
const onCompletedClikHendler = () => {
  props.changeFilter("completed")
}
    return (
      <div>
        <h3>{props.title}</h3>
        <div>
          <input value={title}
          onChange={onChangeHendler}
          onKeyPress={onKeyPressHendler} />
          <button onClick={addTask}>+</button>
        </div>
        <ul>
          {props.tasks.map(t => {
            const onClikHendler = () => {
              props.removeTask(t.id)
            }
            return(
            <li key={t.id}><input type="checkbox" checked={t.isDone} />
            <span>{t.title}</span>
            <button onClick={onClikHendler}>✖️</button>
            </li>
          )})}
        </ul>
        <div>
          <button onClick={onAllClikHendler}>All</button>
          <button onClick={onActiveClikHendler}>Active</button>
          <button onClick={onCompletedClikHendler}>Completed</button>
        </div>
      </div>
    )
  }
  
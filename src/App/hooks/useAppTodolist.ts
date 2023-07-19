import { useState } from "react"
import { v1 } from "uuid"
import { FilterValueType, TodolistType } from "../App"
import { todolistID1, todolistID2 } from "../id-utils"

export const useAppTodolist = (
     onTodolistRemoved:(id:string)=> void,
     onTodolistAdded:(newTodolistId:string)=> void) => {

    let [todolists, setTodolists] = useState<Array<TodolistType>>(
        [
            { id: todolistID1, title: 'What to learn', filter: 'all' },
            { id: todolistID2, title: 'What to buy', filter: 'all' }
        ]
    )
    const removeTodolist = (id: string) => {
        setTodolists(todolists.filter(t => t.id !== id));
        onTodolistRemoved(id)

    }

    const ChangeTodolistTitle = (id: string, newTitle: string) => {
        const todolist = todolists.find(tl => tl.id === id);
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }

    const changeFilter = (value: FilterValueType, todolistId: string) => {

        setTodolists(todolists.map(t => t.id === todolistId
            ? { ...t, filter: value }
            : t))
    }

    const addTodolist = (title: string) => {
        let newTodolistId = v1();
        let newTodolist: TodolistType = { id: newTodolistId, title: title, filter: 'all' };
        setTodolists([newTodolist, ...todolists]);
        onTodolistAdded(newTodolistId)
    }
    return {
        todolists,
        removeTodolist,
        changeFilter,
        ChangeTodolistTitle,
        addTodolist,
    }
}
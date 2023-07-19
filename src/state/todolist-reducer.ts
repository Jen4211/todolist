import { v1 } from "uuid";
import { FilterValueType, TodolistType } from "../App/App";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangeTodolistActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValueType
}
type ActionsTypes = RemoveTodolistActionType
| AddTodolistActionType
| ChangeTodolistActionType
| ChangeTodolistFilterActionType

const initialState: Array<TodolistType> = []

export const todolistReducer = (state: Array<TodolistType> = initialState, action: ActionsTypes): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(s => s.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(s => s.id === action.id
                ? { ...s, filter: action.filter }
                : s)
        }
        default:
            return state;

    }
}
export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
   return {
    type: 'REMOVE-TODOLIST',
    id: todolistId}
}
export const AddTodolistAC = (newTodolistTitle: string): AddTodolistActionType => {
    return {
        type: "ADD-TODOLIST",
        title: newTodolistTitle,
        todolistId: v1()
    }
}
export const ChangeTodolistAC = (todolistId: string, newTodolistTitle: string): ChangeTodolistActionType => {
    return {
type: "CHANGE-TODOLIST-TITLE",
id: todolistId,
title: newTodolistTitle
    }
}
export const ChangeTodolistFilterAC = (newFilter:FilterValueType ,todolistId: string): ChangeTodolistFilterActionType => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        id: todolistId,
        filter: newFilter
    }
}
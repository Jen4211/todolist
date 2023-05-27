import { v1 } from "uuid";
import { TaskStateType } from "../App";
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolist-reducer";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    id: string
    todolistId: string
}
export type AddTaskActionType = {
    type: "ADD-TASK"
    title: string
    id: string
}
export type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    isDone: boolean
    taskId: string
    todolistId: string
}
export type ChangeTitleStatusActionType = {
    type: "CHANGE-TITLE-STATUS"
    taskId: string
    newTitle: string
    todolistId: string
}

type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTitleStatusActionType
    | RemoveTodolistActionType
    | AddTodolistActionType;

const initialState: TaskStateType = {};

export const tasksReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = { ...state }
            const tasks = state[action.todolistId];
            const filteredTasks = tasks.filter(t => t.id !== action.id);
            stateCopy[action.todolistId] = filteredTasks;
            return stateCopy;
        }
        case "ADD-TASK": {
            const stateCopy = { ...state };
            const task = { id: v1(), title: action.title, isDone: false };
            stateCopy[action.id] = [task, ...stateCopy[action.id]]
            return stateCopy;
        }
        case "CHANGE-TASK-STATUS": {
            let todolistTasks = state[action.todolistId]
            
            state[action.todolistId] = todolistTasks.map(t => t.id === action.taskId
                ? {...t, isDone: action.isDone}
                : t);
            return ({ ...state });
        }
        case "CHANGE-TITLE-STATUS": {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.map(t => t.id === action.taskId
                ? {...t, title: action.newTitle}
                : t);
            return ({...state});
        }
        case "ADD-TODOLIST": {
            const stateCopy = { ...state };
            stateCopy[action.todolistId] = []
            return stateCopy;
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = { ...state };
            delete stateCopy[action.id];
            return stateCopy;
        }

        default:
            return state;
    }
}

export const removeTaskAC = (id: string, todolistId: string): RemoveTaskActionType => {
    return {
        type: "REMOVE-TASK",
        id: id,
        todolistId: todolistId
    }
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {
        type: "ADD-TASK",
        title: title,
        id: todolistId

    }
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {
        type: "CHANGE-TASK-STATUS",
        isDone: isDone,
        taskId: taskId,
        todolistId: todolistId
    }
}
export const changeTitleStatusAC = (taskId: string, newTitle: string, todolistId: string): ChangeTitleStatusActionType => {
    return {
        type: "CHANGE-TITLE-STATUS",
        newTitle: newTitle,
        taskId: taskId,
        todolistId: todolistId
    }
}
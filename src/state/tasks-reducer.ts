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

export const tasksReducer = (state: TaskStateType, action: ActionType): TaskStateType => {
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
            const stateCopy = { ...state };
            let task = stateCopy[action.todolistId].find(t => t.id === action.taskId);
            if (task) {
                task.isDone = action.isDone;
            }
            return stateCopy;
        }
        case "CHANGE-TITLE-STATUS": {
            const stateCopy = { ...state };
            let task = stateCopy[action.todolistId].find(t => t.id === action.taskId);
            if (task) {
                task.title = action.newTitle
            }
            return stateCopy;
        }
        case "ADD-TODOLIST": {
            const stateCopy = { ...state };
            stateCopy[action.todolistId] = []
            return stateCopy;
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        }

        default:
            throw new Error("I don't understand this action type");
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
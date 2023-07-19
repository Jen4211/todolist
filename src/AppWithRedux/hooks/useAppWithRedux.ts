import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../state/store";
import { addTaskAC, changeTaskStatusAC, changeTitleStatusAC, removeTaskAC } from "../../state/tasks-reducer";
import { AddTodolistAC, ChangeTodolistAC, ChangeTodolistFilterAC, RemoveTodolistAC } from "../../state/todolist-reducer";
import { FilterValueType, TaskStateType, TodolistType } from "../AppWithRedux";

export const useAppWithRedux = () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks);
    const dispatch = useDispatch();

    const removeTodolist = useCallback((id: string) => {
        const action = RemoveTodolistAC(id);
        dispatch(action);
    }, [dispatch])
    const ChangeTodolistTitle = useCallback((id: string, newTitle: string) => {
        const action = ChangeTodolistAC(id, newTitle);
        dispatch(action);
    }, [dispatch])
    const addTask = useCallback((title: string, todolistId: string) => {
        const action = addTaskAC(title, todolistId);
        dispatch(action);
    }, [dispatch])
    const removeTasks = useCallback((id: string, todolistId: string) => {
        const action = removeTaskAC(id, todolistId);
        dispatch(action);
    }, [dispatch])
    const changeFilter = useCallback((value: FilterValueType, todolistId: string) => {
        const action = ChangeTodolistFilterAC(value, todolistId)
        dispatch(action);
    }, [dispatch])
    const changeTaskStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(id, isDone, todolistId);
        dispatch(action);
    }, [dispatch])
    const changeTitleStatus = useCallback((id: string, newTitle: string, todolistId: string) => {
        const action = changeTitleStatusAC(id, newTitle, todolistId)
        dispatch(action);
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        const action = AddTodolistAC(title);
        dispatch(action);
    }, [dispatch])

    return {
        todolists,
        tasks,
        removeTodolist,
        ChangeTodolistTitle,
        addTask,
        removeTasks,
        changeFilter,
        changeTaskStatus,
        changeTitleStatus,
        addTodolist
    }
}
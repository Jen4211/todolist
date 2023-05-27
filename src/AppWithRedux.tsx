import { useCallback } from 'react';
import { v1 } from 'uuid';
import './App.css';
import AddItemForm from './AddItemForm';
import { TasksType, Todolist } from './Todolist';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { AddTodolistAC, ChangeTodolistAC, ChangeTodolistFilterAC, RemoveTodolistAC } from './state/todolist-reducer';
import { addTaskAC, changeTaskStatusAC, changeTitleStatusAC, removeTaskAC } from './state/tasks-reducer';
import { AppRootStateType } from './state/store';
import { useDispatch, useSelector } from 'react-redux';

export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
export type FilterValueType = 'all' | 'active' | 'completed';

export type TaskStateType = {
    [key: string]: Array<TasksType>
}



function AppWithRedux() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    // 
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

    return (
        <div className='App'>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{ padding: '20px' }}>
                    <AddItemForm addTask={addTodolist} />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(t => {
                             let allTodolistTasks = tasks[t.id];
                             let taskForTodolist = allTodolistTasks;
                            return (
                                <Grid item key={t.id}>
                                    <Paper style={{ padding: '10px' }}>
                                        <Todolist key={t.id}
                                            id={t.id}
                                            title={t.title}
                                            tasks={taskForTodolist}
                                            removeTask={removeTasks}
                                            changeFilter={changeFilter}
                                            changeTaskStatus={changeTaskStatus}
                                            addTask={addTask}
                                            filter={t.filter}
                                            removeTodolist={removeTodolist}
                                            ChangeTodolistTitle={ChangeTodolistTitle}
                                            changeTitleStatus={changeTitleStatus} />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>

        </div>
    );
}



export default AppWithRedux;


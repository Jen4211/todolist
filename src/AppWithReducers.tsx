import { useReducer } from 'react';
import { v1 } from 'uuid';
import './App.css';
import AddItemForm from './AddItemForm';
import { TasksType, Todolist } from './Todolist';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { AddTodolistAC, ChangeTodolistAC, ChangeTodolistFilterAC, RemoveTodolistAC, todolistReducer } from './state/todolist-reducer';
import { addTaskAC, changeTaskStatusAC, changeTitleStatusAC, removeTaskAC, tasksReducer } from './state/tasks-reducer';

export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
export type FilterValueType = 'all' | 'active' | 'completed';

export type TaskStateType = {
    [key: string]: Array<TasksType>
}



function AppWithReducer() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            { id: v1(), title: "Css", isDone: true },
            { id: v1(), title: "Js", isDone: true },
            { id: v1(), title: "React", isDone: false }
        ],
        [todolistID2]: [
            { id: v1(), title: "act", isDone: true },
            { id: v1(), title: "Re", isDone: false }
        ]
    })
    let [todolists, dispatchToTodolists] = useReducer(todolistReducer, [
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' }
    ])

    const removeTodolist = (id: string) => {
        const action = RemoveTodolistAC(id);
        dispatchToTodolists(action);
    }
    const ChangeTodolistTitle = (id: string, newTitle: string) => {
        const action = ChangeTodolistAC(id, newTitle);
        dispatchToTodolists(action);
    }
    const addTask = (title: string, todolistId: string) => {
        const action = addTaskAC(title, todolistId);
        dispatchToTasks(action);
    }
    const removeTasks = (id: string, todolistId: string) => {
        const action = removeTaskAC(id, todolistId);
        dispatchToTasks(action);
    }
    const changeFilter = (value: FilterValueType, todolistId: string) => {
        const action = ChangeTodolistFilterAC(value, todolistId)
        dispatchToTodolists(action);
    }
    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(id, isDone, todolistId);
        dispatchToTasks(action);
    }
    const changeTitleStatus = (id: string, newTitle: string, todolistId: string) => {
        const action = changeTitleStatusAC(id, newTitle, todolistId)
        dispatchToTasks(action);
    }
    const addTodolist = (title: string) => {
        const action = AddTodolistAC(title);
        dispatchToTasks(action);
        dispatchToTodolists(action);
    }

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

                            if (t.filter === "active") {
                                taskForTodolist = allTodolistTasks.filter(el => el.isDone === false)
                            }
                            if (t.filter === "completed") {
                                taskForTodolist = allTodolistTasks.filter(el => el.isDone === true)
                            }
                            return (
                                <Grid item>
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



export default AppWithReducer;


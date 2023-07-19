
import { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TasksType, Todolist } from '../Todolist';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import AddItemForm from '../AddItemForm/AddItemForm';
import { useAppTask } from './hooks/useAppTask';
import { useAppTodolist } from './hooks/useAppTodolist';

export type TodolistType = {
  id: string
  title: string
  filter: FilterValueType
}
export type FilterValueType = 'all' | 'active' | 'completed';

export type TaskStateType = {
  [key: string]: Array<TasksType>
}



function App() {

  const {
    tasks,
    addTask,
    removeTasks,
    changeTaskStatus,
    changeTitleStatus,
    removeTaskaForTodolist,
    addTasksForTodolist
  } = useAppTask()

  const {
    todolists,
    removeTodolist,
    changeFilter,
    ChangeTodolistTitle,
    addTodolist,
  } = useAppTodolist( removeTaskaForTodolist, addTasksForTodolist)


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

              return (
                <Grid item>
                  <Paper style={{ padding: '10px' }}>
                    <Todolist key={t.id}
                      id={t.id}
                      title={t.title}
                      tasks={tasks[t.id]}
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



export default App;

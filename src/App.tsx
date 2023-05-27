
import { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import AddItemForm from './AddItemForm';
import { TasksType, Todolist } from './Todolist';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';

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

  let todolistID1 = v1();
  let todolistID2 = v1();

  let [tasks, setTasks] = useState<TaskStateType>({
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
  let [todolists, setTodolists] = useState<Array<TodolistType>>(
    [
      { id: todolistID1, title: 'What to learn', filter: 'all' },
      { id: todolistID2, title: 'What to buy', filter: 'all' }
    ]
  )

  const removeTodolist = (id: string) => {
    setTodolists(todolists.filter(t => t.id !== id));

    delete tasks[id];
    setTasks({ ...tasks })
  }

  const ChangeTodolistTitle = (id: string, newTitle: string) => {
    const todolist = todolists.find(tl => tl.id === id);
    if (todolist) {
      todolist.title = newTitle
      setTodolists([...todolists])
    }
  }

  const addTask = (title: string, todolistId: string) => {
    let task = { id: v1(), title: title, isDone: false };
    let todolistTasks = tasks[todolistId]
    tasks[todolistId] = [task, ...todolistTasks]
    setTasks({ ...tasks })
  }

  const removeTasks = (id: string, todolistId: string) => {
    let todolistTasks = tasks[todolistId];
    tasks[todolistId] = todolistTasks.filter(t => t.id !== id)
    setTasks({ ...tasks });
  }
  const changeFilter = (value: FilterValueType, todolistId: string) => {
    // let todolist = todolists.find(t => t.id === todolistId)
    // if (todolist) {
    //   todolist.filter = value;
    //   setTodolists([...todolists]);
    // }
    setTodolists(todolists.map(t => t.id === todolistId
      ? { ...t, filter: value }
      : t))

  }
  const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
    let todolistTasks = tasks[todolistId]
    let task = todolistTasks.find(t => t.id === id);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasks })
    }
  }
  const changeTitleStatus = (id: string, newTitle: string, todolistId: string) => {
    let todolistTasks = tasks[todolistId];
    let task = todolistTasks.find(t => t.id === id);
    if (task) {
      task.title = newTitle;
      setTasks({ ...tasks })
    }

  }
  const addTodolist = (title: string) => {
    let newTodolistId = v1();
    let newTodolist: TodolistType = { id: newTodolistId, title: title, filter: 'all' };
    setTodolists([newTodolist, ...todolists]);
    setTasks({ ...tasks, [newTodolistId]: [] })
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
        <Grid container style={{padding: '20px'}}>
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
                  <Paper style={{padding: '10px'}}>
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



export default App;

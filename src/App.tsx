import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";


export type FilterValuesType = "Active" | "Completed" | "All"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todolistId1, title: "Name-list", filter: "All"},
        {id: todolistId2, title: "Name-list-2", filter: "All"}
    ])
    const [tasksObj, setTasksObj] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
        ],

        [todolistId2]: [
            {id: v1(), title: "Купить молоко", isDone: true},
            {id: v1(), title: "Продать машину", isDone: false},
        ]
    })
    const removeTask = (id: string, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(el => el.id !== id)
        tasksObj[todolistId] = filteredTasks;
        setTasksObj({...tasksObj})
    }
    const addTask = (newTitle: string, todolistId: string) => {
        const task = {id: v1(), title: newTitle, isDone: false}
        let tasks = tasksObj[todolistId];
        let newTasks = [task, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasksObj({...tasksObj})
    }
    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        let todolist = todoLists.find(t => t.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodoLists([...todoLists])
        }
    }
    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone;

            setTasksObj({...tasksObj})
        }
    }
    const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.title = newTitle;

            setTasksObj({...tasksObj})
        }
    }
    const removeTodolist = (todolistId: string) => {
        let filteredTodolist = todoLists.filter(t => t.id !== todolistId)
        setTodoLists(filteredTodolist)
        delete tasksObj[todolistId]
        setTasksObj({...tasksObj})
    }
    const changeTodolistTitle = (id: string, newTitle: string) => {
        const todolist = todoLists.find(tl => tl.id === id);
        if (todolist) {
            todolist.title = newTitle;
            setTodoLists([...todoLists])
        }


    }

    function addTodolist(title: string) {
        let todoList: TodoListType = {
            id: v1(),
            filter: "All",
            title: title
        }
        setTodoLists([todoList, ...todoLists])
        setTasksObj({
            ...tasksObj,
            [todoList.id]: []
        })
    }

    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        Todolist
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    {todoLists.map((t) => {

                        let tasksForTodoList = tasksObj[t.id];

                        if (t.filter === "Active") {
                            tasksForTodoList = tasksForTodoList.filter(task => task.isDone === false)
                        }
                        if (t.filter === "Completed") {
                            tasksForTodoList = tasksForTodoList.filter(task => task.isDone === true)
                        }

                        return <Grid item>
                            <Paper elevation={3} style={{padding: "15px"}}>
                                <Todolist
                                    removeTodolist={removeTodolist}
                                    key={t.id}
                                    id={t.id}
                                    title={t.title}
                                    tasks={tasksForTodoList}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    filter={t.filter}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}/>
                            </Paper>
                        </Grid>
                    })
                    }
                </Grid>

            </Container>

        </div>
    );
}

    export default App;

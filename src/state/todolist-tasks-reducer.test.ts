import {TasksStateType, TodoListType} from "../App";
import { TasksReducer} from "./Tasks-reducer";
import {addTodolistAC, TodolistReducer} from "./Todolist-reducer";

test('ids should be equals',()=>{
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodoListType> = [];

    const action = addTodolistAC("new todolist");

    const endTasksState = TasksReducer(startTasksState, action)
    const endTodolistsState = TodolistReducer(startTodolistsState, action)

    const keys =  Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;


    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)


})
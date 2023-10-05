import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    filter: FilterValuesType

    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (newTitle: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export const Todolist: React.FC<PropsType> = (props: PropsType) => {

    const changeFilterHandler = (value: FilterValuesType, id: string) => {
        props.changeFilter(value, id)
    }
    const mapped = props.tasks.map(t => {
        const removeTaskHandler = () => {
            props.removeTask(t.id, props.id)
        }

        const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            props.changeTaskStatus(t.id, newIsDoneValue, props.id)
        }

        const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id)
        }
        return (
            <div key={t.id} className={t.isDone ? "is-done" : ""}>

                <Checkbox  checked={t.isDone} onChange={onChangeCheckboxHandler}/>
                <EditableSpan title={t.title}
                              onChange={onChangeTitleHandler}/>
                <IconButton onClick={removeTaskHandler} size="small" aria-label="delete">
                    <Delete fontSize="inherit"/>
                </IconButton>
            </div>
        )
    })
    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    return (
        <div>
            <h3> <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist} aria-label="delete">
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {mapped}
            </div>
            <div>
                <Button variant={props.filter === 'All' ? "contained" : "text"}
                        onClick={() => changeFilterHandler("All", props.id)}>All
                </Button>
                <Button color={"secondary"} variant={props.filter === 'Active' ? "contained" : "text"}
                        onClick={() => changeFilterHandler("Active", props.id)}>Active
                </Button>
                <Button color={"success"} variant={props.filter === 'Completed' ? "contained" : "text"}
                        onClick={() => changeFilterHandler("Completed", props.id)}>Completed
                </Button>
                {/* <button callBack={() => changeFilterHandler("All")}>All</button>
                <button  name={"All"} callBack={() => changeFilterHandler("All")}/>
                <button  name={"Active"} callBack={() => changeFilterHandler("Active")}/>
                <button  name={"Completed"} callBack={() => changeFilterHandler("Completed")}/>*/}
            </div>
        </div>
    )
}


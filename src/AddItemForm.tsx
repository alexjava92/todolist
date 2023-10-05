import styled from "styled-components";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type AddItemFormProps = {
    addItem: (newTitle: string) => void

}

export function AddItemForm(props: AddItemFormProps) {
    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") {
            addTaskHandler()
        }
    }
    const addTaskHandler = () => {
        if (newTitle.trim() !== "") {
            props.addItem(newTitle.trim())
            setNewTitle("")
        } else {
            setError("Field title is required")
        }

    }
    return <div>
        <TextField value={newTitle}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   variant={"outlined"}
                   label={"Type value"}
                   error={!!error}
                   helperText={error}
        />
        <IconButton onClick={addTaskHandler}  color={"primary"} >
         <ControlPoint/>
        </IconButton>
    </div>
}


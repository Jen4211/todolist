import { AddBox } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import React from "react";
import { useAddItemForm } from "./hooks/useAddItemForm";


type AddItemFormPropsType = {
    addTask: (title: string) => void
}

const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    const {
        title,
        error,
        onChangeHendler,
        onKeyPressHendler,
        addItem
    } = useAddItemForm(props.addTask)
    return (

        <div>
            <TextField variant="outlined"
                value={title}
                onChange={onChangeHendler}
                onKeyPress={onKeyPressHendler}
                error={!!error}
                label='Title'
                helperText={error} />
            <IconButton
                color="primary"
                onClick={addItem}>
                <AddBox />
            </IconButton>
        </div>
    )


})
export default AddItemForm;
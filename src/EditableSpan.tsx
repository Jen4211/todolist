import { TextField } from "@mui/material";
import React from "react";
import { ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string) => void
}

const EditableSpan = React.memo( (props:EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState("");

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title)
    }
    const onChangeTitleHendler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        editMode
            ? <TextField variant="outlined" value={title} onChange={onChangeTitleHendler} onBlur={activateViewMode} autoFocus />
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
})

export default EditableSpan;
import { TextField } from "@mui/material";
import React from "react";
import { useAditableSpan } from "./hooks/useEditableSpan";

export type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string) => void
}

const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    const {
        title,
        editMode,
        activateEditMode,
        activateViewMode,
        onChangeTitleHendler } = useAditableSpan(props)
    return (
        editMode
            ? <TextField variant="outlined" value={title} onChange={onChangeTitleHendler} onBlur={activateViewMode} autoFocus />
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
})

export default EditableSpan;
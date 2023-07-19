import { ChangeEvent, useState } from "react";
import { EditableSpanPropsType } from "../EditableSpan";


export const useAditableSpan = (props:EditableSpanPropsType) => {
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
    return {
        title,
        editMode,
        activateEditMode,
        activateViewMode,
        onChangeTitleHendler
    }
}
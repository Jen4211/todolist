import { ChangeEvent, FC, useState } from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string) => void
}

const EditableSpan: FC<EditableSpanPropsType> = (props) => {
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
            ? <input value={title} onChange={onChangeTitleHendler} onBlur={activateViewMode} autoFocus />
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}

export default EditableSpan;
import { AddBox } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import { ChangeEvent, FC, KeyboardEvent, useState } from "react";


type AddItemFormPropsType = {
    addTask: (title: string) => void
}

const AddItemForm: FC<AddItemFormPropsType> = (props) => {
    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null)


    const addItem = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim());
            setTitle('');
        } else {
            setError('This is required')
        }
    }

    const onChangeHendler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyPressHendler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addItem()
        }
    }
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


}
export default AddItemForm;
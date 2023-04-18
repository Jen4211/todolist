import { Button } from "@mui/material";
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
            <input value={title}
                onChange={onChangeHendler}
                onKeyPress={onKeyPressHendler}
                className={error ? 'error' : ''} />
            <Button style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                onClick={addItem}> + </ Button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )


}
export default AddItemForm;
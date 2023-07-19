import { ChangeEvent, KeyboardEvent, useState } from "react";

 export const useAddItemForm = (onItemAdded:(title:string) => void) => {
    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null)


    const addItem = () => {
        if (title.trim() !== '') {
            onItemAdded(title.trim());
            setTitle('');
        } else {
            setError('This is required')
        }
    }

    const onChangeHendler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyPressHendler = (event: KeyboardEvent<HTMLInputElement>) => {
       if(error !== null) {
        setError(null)
       }
       if(event.key === "Enter") {
        addItem()
       }
    }
    return {
        title,
        error,
        onChangeHendler,
        onKeyPressHendler,
        addItem  
    }
 }
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { db } from '../firebase'
import { doc, setDoc, addDoc, collection } from 'firebase/firestore'

type taskProps = {
    title: string,
    description?: string,
    mode: string,
}
export default function Task({title = '', description = '', mode='save'} : taskProps) {
    const [taskTitle, setTaskTitle] = useState(title || 'New task')
    const [taskDescription, setTaskDescription] = useState(description || ''); 
    const {
        register,
        formState: {
            errors,
        },
        handleSubmit,
        reset,
    } = useForm()

    // function handleInputTitle(e: HTMLInputElement): void {
    //     if(!e.target) return;

    //     setTaskTitle(e.target.value);
    // }

    async function onSubmit(data: any) {
        await addDoc(collection(db, "tasks"), {
            title: data.title,
            description: "test"
        })
        reset()
    }
  
    return (
    <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                {...register('title', {
                    required: "Enter title!",

                })}
            />
            <input type="submit" value={mode} />
        </form>
    </>
  )
}


// export async function loader({ params }: any) {
    
// }
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { db } from '../firebase'
import { doc, setDoc, addDoc, collection } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Login from './Login'


export default function Task() {

    const {
        register,
        formState: {
            errors,
        },
        handleSubmit,
        reset,
    } = useForm()

    const { isAuth, email } = useAuth();

    const navigate = useNavigate()

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
  
    return isAuth ? (
    <>
        <div>
            <button onClick={() => navigate('/')}>Back</button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                {...register('title', {
                    required: "Enter title!",

                })}
            />
            <input type="submit" />
        </form>
    </>
  ) : (
    <Login />
  )
}


// export async function loader({ params }: any) {
    
// }
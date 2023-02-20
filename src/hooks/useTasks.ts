import { useAppDispatch, useAppSelector } from "./redux-hooks";
import { useState, useEffect } from "react";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";
import { addTask } from "../store/slices/tasksSlice";

export type dayType = {
  id: string;
  day: number;
  month: number;
  year: number;
  tasks: taskType[],
  //tasks: taskType[];
};

export type taskType = {
  title: string;
  todo: string;
};

export function useTasks(email: string | null) {
  const [days, setDays] = useState<dayType[]>([]);

  useEffect(() => {
    if (!email) return;

    const getTasks = async () => {
      const dbDays = await retrieveDays(email);
      console.log(dbDays)
      setDays([...dbDays]);
    };
    getTasks();
  }, [email]);

  return days;
}


async function retrieveDays(email: string) {
  const days: dayType[] = [];
  const q = query(collection(db, email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (doc) => {
    //const tasks = await retrieveTasks(email, doc.id);
    const dayData = doc.data();
    days.push({
      id: doc.id,
      day: dayData.day,
      month: dayData.month,
      year: dayData.year,
      tasks: dayData.tasks,
      //tasks: [...tasks],
    });
  });

  return days;
}

// async function retrieveTasks(email: string, docId: string) {
//   const t = query(collection(db, `${email}/${docId}/tasks`));
//   const taskSnapshot = await getDocs(t);
//   const tasks: taskType[] = [];

//   taskSnapshot.forEach((task) => {
//     const taskData = task.data();

//     tasks.push({
//       id: task.id,
//       title: taskData.title,
//       todo: taskData.todo,
//     });
//   });

//   return tasks;
// }

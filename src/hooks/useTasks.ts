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
  tasks: taskType[];
};

export type taskType = {
  id: number;
  title: string;
  todo: string;
  completed: boolean;
};

export function useTasks(email: string | null) {
  const [days, setDays] = useState<dayType[]>([]);

  useEffect(() => {
    if (!email) return;

    const getTasks = async () => {
      const dbDays = await retrieveDays(email);
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

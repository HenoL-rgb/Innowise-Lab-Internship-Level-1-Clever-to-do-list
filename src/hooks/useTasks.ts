import { useAppDispatch, useAppSelector } from "./redux-hooks";
import { useState, useEffect } from "react";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
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

export function useTasks(email: string, month: number, year: number) {
  const [days, setDays] = useState<dayType[]>([]);
  useEffect(() => {
    if (!email) return;

    const getTasks = async (month: number, year: number) => {
      const dbDays = await retrieveDays(email, month, year);
      setDays([...dbDays]);
    };
    getTasks(month, year);
    
  }, [email, month, year]);

  return days;
}

async function retrieveDays(email: string, month: number, year: number) {
  const days: dayType[] = [];
  const q = query(collection(db, email), where("month", "==", month), where("year", "==", year));
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

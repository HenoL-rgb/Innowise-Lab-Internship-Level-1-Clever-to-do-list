import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

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

export type currTaskTypes = {
  taskId: number,
  title: string,
  todo: string,
}

export type tasksTypes = {
  tasks: dayType[];
};

export type currDayTypes = {
  day: number,
  month: number,
  year: number,
  id: string,
  completed: boolean,
  uncompleted: boolean,
}

// export async function retrieveDays(email: string, month: number, year: number) {
//   const days: dayType[] = [];
//   const q = query(collection(db, email), where("month", "==", month), where("year", "==", year));
//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach(async (doc) => {
//     const dayData = doc.data();
//     days.push({
//       id: doc.id,
//       day: dayData.day,
//       month: dayData.month,
//       year: dayData.year,
//       tasks: dayData.tasks,
//     });
//   });

//   return days;
// }

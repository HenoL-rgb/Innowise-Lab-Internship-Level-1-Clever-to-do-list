import { useState, useEffect } from "react";

export type calendarDaysType = {
  day: number;
  month: number;
  year: number;
  id: string;
};
export function useDays(page: number) {
  const [daysList, setDaysList] = useState<calendarDaysType[]>([]);

  const currDate = new Date();
  const currMonth = currDate.getMonth();
  const currDay = currDate.getDate();
  const currYear = currDate.getFullYear();

  useEffect(() => {
    function getDaysInMonth(month: number, year: number, day: number) {
      const date = new Date(year, month, day);
      const days: calendarDaysType[] = [];
      const newDate = new Date(date);
      days.push({
        day: newDate.getDate(),
        month: newDate.getMonth(),
        year: newDate.getFullYear(),
        id: "",
      });
      date.setDate(date.getDate() + 1);
      while (date.getDate() !== day) {
        const newDate = new Date(date);
        days.push({
          day: newDate.getDate(),
          month: newDate.getMonth(),
          year: newDate.getFullYear(),
          id: "",
        });
        date.setDate(date.getDate() + 1);
      }
      const newDateEnd = new Date(date);

      days.push({
        day: newDateEnd.getDate(),
        month: newDateEnd.getMonth(),
        year: newDateEnd.getFullYear(),
        id: "",
      });
      return days;
    }

    const daysArr = getDaysInMonth(currMonth, currYear, currDay);
    setDaysList([...daysArr]);

    return () => {
      setDaysList([]);
    };
  }, [page]);

  return daysList;
}

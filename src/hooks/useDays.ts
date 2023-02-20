import { useState, useEffect } from "react";

export function useDays(page: number) {
  const [daysList, setDaysList] = useState<Date[]>([]);

  const currDate = new Date();
  const currMonth = currDate.getMonth();
  const currDay = currDate.getDate();
  const currYear = currDate.getFullYear();

  useEffect(() => {
    function getDaysInMonth(month: any, year: any, day: any) {
      const date = new Date(year, month, day);
      const days = [];
      days.push(new Date(year, month, day));
      date.setDate(date.getDate() + 1);
      while (date.getDate() !== day) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }
      days.push(new Date(date));
      return days;
    }

    const daysArr = getDaysInMonth(currMonth, currYear, currDay);
    setDaysList([...daysArr]);

    return () => {
        setDaysList([]);
    }
  }, [page]);

  return daysList;
}

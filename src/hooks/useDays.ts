import { useState, useEffect } from "react";
import { calendarDaysType } from "../types/types";


export function useDays(currentMonth: number, currentYear: number) {
  const [daysList, setDaysList] = useState<calendarDaysType[]>([]);

  const currDate = new Date();
  const currMonth = currDate.getMonth();
  const currDay = currDate.getDate();
  const currYear = currDate.getFullYear();

  useEffect(() => {
    function getDaysInMonth(month: number, year: number) {
        const startDay = (month === currMonth && year === currYear) ? currDay : 1;
      let date = new Date(year, month, startDay);
      const days: calendarDaysType[] = [];

      while (date.getMonth() === month) {
        days.push({
          day: date.getDate(),
          month: date.getMonth(),
          year: date.getFullYear(),
          id: "",
        });
        date.setDate(date.getDate() + 1);
        date = new Date(date);
      }

      return days;
    }

    const daysArr = getDaysInMonth(currentMonth, currentYear);
    setDaysList([...daysArr]);

    return () => {
      setDaysList([]);
    };
  }, [currentMonth, currentYear]);

  return daysList;
}

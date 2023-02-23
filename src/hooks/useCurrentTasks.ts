import { useState, useEffect } from 'react';
import { useAppSelector } from './redux-hooks'
import { dayType, taskType } from '../functions.ts/retrieveDays';

export function useCurrentTasks(days: dayType[]) {
    const {day, month, year} = useAppSelector(state => state.currentDay)
    const tasks = useAppSelector(state => state.task.tasks)
    const [currentTasks, setCurrentTasks] = useState<taskType[]>([]);

    useEffect(() => {
        for(const curDay in days) {
            const obj = days[curDay]
            if(obj.day === day && obj.month === month && obj.year === year){
                
                setCurrentTasks([...obj.tasks])
                return;
            }
        }

        setCurrentTasks([])

    }, [day, month, year, tasks])
    
    return currentTasks;
}


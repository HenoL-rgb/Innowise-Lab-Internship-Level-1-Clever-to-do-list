import { useState, useEffect } from 'react';
import { useAppSelector } from './redux-hooks'
import { dayType, taskType } from './useTasks';

export function useCurrentDay(tasks: dayType[]) {
    const {day, month, year} = useAppSelector(state => state.currentDay)
    const [currentTasks, setCurrentTasks] = useState<taskType[]>([]);

    useEffect(() => {
        for(const task in tasks) {
            const obj = tasks[task]
            if(obj.day === day && obj.month === month && obj.year === year){
                const tasksToArr = [];
                const objTasks = Object.values(obj.tasks);
                for(const objTask of objTasks) {
                    tasksToArr.push({
                        id: task,
                        title: objTask.title,
                        todo: objTask.todo
                    })
                }
                setCurrentTasks([...tasksToArr])
                return;
            }
        }

        setCurrentTasks([])

    }, [day, month, year])
    
    return currentTasks;
}


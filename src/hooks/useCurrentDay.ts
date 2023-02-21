import { useAppSelector } from './redux-hooks'

export function useCurrentDay() {
    const {day, month, year, id} = useAppSelector(state => state.currentDay)
    
    return {
        day,
        month,
        year,
        id,
    };
}
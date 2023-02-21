import { useAppSelector } from './redux-hooks'

export function useCurrentTask() {
    const {taskId, title, todo} = useAppSelector(state => state.currentTask)
    
    return {
        title,
        todo,
        taskId,
    };
}
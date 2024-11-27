import {TasksStateType} from "../App";
import {v1} from "uuid";

export type removeTaskActionType = {
    type: 'REMOVE-TASK',
    payload: {
        taskId: string,
        todolistId: string
    }
}
export type addTaskActionType = {
    type: 'ADD-TASK',
    payload: {
        title: string,
        todolistId: string
    }
}
export type changeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    payload: {
        taskId: string,
        taskStatus: boolean,
        todolistId: string
    }
}
export type updateTaskTitleActionType = {
    type: 'UPDATE-TASK-TITLE',
    payload: {
        todolistId: string,
        taskId: string,
        title: string
    }
}

type TasksReducerActionTypes =
    removeTaskActionType
    | addTaskActionType
    | changeTaskStatusActionType
    | updateTaskTitleActionType

export const tasksReducer = (tasks: TasksStateType, action: TasksReducerActionTypes): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...tasks,
                [action.payload.todolistId]: tasks[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        case "ADD-TASK":
            return {
                ...tasks,
                [action.payload.todolistId]: [{
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }, ...tasks[action.payload.todolistId]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...tasks,
                [action.payload.todolistId]: tasks[action.payload.todolistId].map(t => t.id == action.payload.taskId ? {
                    ...t,
                    isDone: action.payload.taskStatus
                } : t)
            }
        case "UPDATE-TASK-TITLE":
            return {
                ...tasks,
                [action.payload.todolistId]: tasks[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    title: action.payload.title
                } : t)
            }
        default:
            return tasks
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): removeTaskActionType => {
    return {type: "REMOVE-TASK", payload: {taskId, todolistId}} as const
}

export const addTaskAC = (title: string, todolistId: string): addTaskActionType => {
    return {type: "ADD-TASK", payload: {title, todolistId}} as const
}

export const changeTaskStatusAC = (taskId: string, taskStatus: boolean, todolistId: string): changeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", payload: {taskId, taskStatus, todolistId}} as const
}

export const updateTaskTitleAC = (todolistId: string, taskId: string, title: string): updateTaskTitleActionType => {
    return {type: "UPDATE-TASK-TITLE", payload: {todolistId, taskId, title}} as const
}
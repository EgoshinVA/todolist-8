import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        todolistId: string
    }
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    payload: {
        title: string
    }
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        filter: FilterValuesType,
        todolistId: string
    }
}

export type UpdateTodolistTitleActionType = {
    type: 'UPDATE-TODOLIST-TITLE'
    payload: {
        todolistId: string,
        title: string
    }
}

type TodolistActionTypes =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistFilterActionType
    | UpdateTodolistTitleActionType

export const todolistsReducer = (todolists: Array<TodolistType>, action: TodolistActionTypes): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.payload.todolistId)
        case "ADD-TODOLIST":
            return [{id: v1(), title: action.payload.title, filter: 'all'}, ...todolists]
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(tl => tl.id === action.payload.todolistId ? {
                ...tl,
                filter: action.payload.filter
            } : tl)
        case "UPDATE-TODOLIST-TITLE":
            return todolists.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)
        default:
            return todolists
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", payload: {todolistId}} as const
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", payload: {title}} as const
}

export const changeTodolistFilterAC = (filter: FilterValuesType, todolistId: string): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", payload: {filter, todolistId}} as const
}

export const updateTodolistTitleAC = (todolistId: string, title: string): UpdateTodolistTitleActionType => {
    return {type: "UPDATE-TODOLIST-TITLE", payload: {todolistId, title}} as const
}
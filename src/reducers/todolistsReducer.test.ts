import {
    addTodolistAC,
    changeTodolistFilterAC,
    removeTodolistAC,
    todolistsReducer,
    updateTodolistTitleAC
} from './todolistsReducer'
import {v1} from 'uuid'
import {TodolistType} from '../App'

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    // 1. Стартовый state
    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    // 2. Действие
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, а не любой
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    // 1. Стартовый state
    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const newTitle = 'new todolist'
    // 2. Действие
    const endState = todolistsReducer(startState, addTodolistAC(newTitle))

    // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
    // в массиве появится новый тудулист
    expect(endState.length).toBe(3)
    // у нового тудулиста наша строка
    expect(endState[0].title).toBe(newTitle)
})

test('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todolistsReducer(startState, updateTodolistTitleAC(todolistId2, 'New Todolist'))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('New Todolist')
})

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todolistsReducer(startState, changeTodolistFilterAC('completed', todolistId2))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')
})
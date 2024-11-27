import {v1} from "uuid";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer, updateTaskTitleAC} from "./tasksReducer";

test('correct task should be deleted', () => {
    const todolistID1 = v1()
    const todolistID2 = v1()

    const tasks = {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    }

    const newTasks = tasksReducer(tasks, removeTaskAC(tasks[todolistID1][0].id, todolistID1))

    expect(newTasks[todolistID1].length).toBe(2)
    expect(newTasks[todolistID1][0].id).toBe(tasks[todolistID1][1].id)
})

test('correct task should be added', () => {
    const todolistID1 = v1()
    const todolistID2 = v1()

    const tasks = {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    }

    const newTitle = 'test title'

    const newTasks = tasksReducer(tasks, addTaskAC(newTitle, todolistID2))

    expect(newTasks[todolistID2][0].title).toBe(newTitle)
    expect(newTasks[todolistID2].length).toBe(3)
})

test('correct task should change isDone', () => {
    const todolistID1 = v1()
    const todolistID2 = v1()

    const tasks = {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    }

    const newTasks = tasksReducer(tasks, changeTaskStatusAC(tasks[todolistID1][0].id, false, todolistID1))

    expect(newTasks[todolistID1][0].isDone).toBe(false)
})

test('correct task should update title', () => {
    const todolistID1 = v1()
    const todolistID2 = v1()

    const tasks = {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    }

    const newTitle = 'updated title'

    const newTasks = tasksReducer(tasks, updateTaskTitleAC(todolistID2, tasks[todolistID2][1].id, newTitle))

    expect(newTasks[todolistID2][1].title).toBe(newTitle)
})
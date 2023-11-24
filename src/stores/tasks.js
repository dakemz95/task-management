import { ref } from 'vue'
import { defineStore } from 'pinia'
import useFetch from '@/composable/useFetch';

export const useTasksStore = defineStore('tasks', () => {

    const { http: request } = useFetch()

    const tasks = ref([])
    const hasMoreTasks = ref(false)

    const getTasks = async () => {
        const response = await request.get('task')
        let currentCursor = response.cursor
        tasks.value = response.items
        hasMoreTasks.value = Boolean(response.next_page)
        while (hasMoreTasks.value) {
            let data = await request.get(`task?cursor=${currentCursor}`)
            tasks.value.push(...data.items)
            currentCursor = data.cursor
            hasMoreTasks.value = Boolean(data.next_page)
        }
    }
    
    const createTask = async ( title, listId, description = '' ) => {
        let currentOrder = tasks.value.filter(task => task.list_id === listId).length + 1
        let task = {
            title: title,
            list_id: listId,
            status: false,
            description: description,
            order: currentOrder,
            finalization_date: null
        }
        await request.post('task', [task])
        getTasks()
    }
    
    const updateTask = async (id, payload) => {
        await request.put(`task/${id}`, payload)
        getTasks()
    }

    const updateTasksPosition = async (tasksList) => {
        const response = await request.put(`task`, tasksList)
        tasks.value = response.items
    }
    
    const deleteTask = async (id) => {
        await request.delete(`task/${id}`)
        getTasks()
    }

    return { tasks, getTasks, createTask, updateTask, updateTasksPosition, deleteTask }
})
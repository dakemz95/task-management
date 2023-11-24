import { ref, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import useFetch from '@/composable/useFetch';
import { useTasksStore } from '@/stores/tasks'


export const useListsStore = defineStore('lists', () => {

    // stores
    const taskStore = useTasksStore()
    const { tasks } = storeToRefs(taskStore)

    const { http: request } = useFetch()

    const lists = ref([])
    const hasMoreLists = ref(false)

    const getLists = async () => {
        const response = await request.get('list')
        let currentCursor = response.cursor
        lists.value = response.items
        hasMoreLists.value = Boolean(response.next_page)
        while (hasMoreLists.value) {
            let data = await request.get(`task?cursor=${currentCursor}`)
            lists.value.push(...data.items)
            currentCursor = data.cursor
            hasMoreLists.value = Boolean(data.next_page)
        }
        orderTasks()
    }
    
    watch(tasks, () => {
        orderTasks()
    })

    function orderTasks() {
        lists.value = lists.value.map( (list) => {
            let currentTasks = tasks.value.filter(task => task.list_id === list._uuid)
            return {
                ...list, 
                tasks: currentTasks.sort((t1, t2) => (t1.order > t2.order) ? 1 : (t1.order < t2.order) ? -1 : 0)
            }
        }).sort((l1, l2) => (l1.order > l2.order) ? 1 : (l1.order < l2.order) ? -1 : 0)
    }

    const createList = async (title ) => {
        let list = {
            title,
            order: lists.value.length + 1
        }
        await request.post('list', [list])
        getLists()
    }

    const editList = async (id) => {
        await request.put(`list/${id}`, [{ title: 'La vida es bellaquera total'}])
        getLists()
    }

    const updateListsPosition = async (lists) => {
        await request.put(`list`, lists)
        getLists()
    }

    const deleteList = async (id) => {
        await request.delete(`list/${id}`)
        getLists()
    }

    return { lists, getLists, createList, editList, updateListsPosition, deleteList }
})
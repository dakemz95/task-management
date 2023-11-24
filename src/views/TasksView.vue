<script setup>
import { ref, computed } from 'vue'
import { useListsStore } from '@/stores/lists';
import { useTasksStore } from '../stores/tasks'
import { storeToRefs } from 'pinia'
import List from '../components/TasksGroup.vue'
import Task from '../components/TaskCard.vue'
import AddList from '../components/AddList.vue'
import draggable from 'vuedraggable'

// stores

const listStore = useListsStore()
const { getLists, updateListsPosition } = listStore
const { lists } = storeToRefs(listStore)

const taskStore = useTasksStore()
const { getTasks, updateTasksPosition } = taskStore

const drag = ref('false')

function reorderTasks () {
    drag.value = false

    let newOrderedTasks = []
    lists.value.forEach(list => {
        list.tasks.map((task, i) => {
            task.list_id = list._uuid
            task.order = i+1
        })
        newOrderedTasks.push(...list.tasks)
    })
    updateTasksPosition(newOrderedTasks)
}

function reorderLists () {
    drag.value = false

    const newOrderedList = lists.value.map((list, i) => {
        return {
            _uuid : list._uuid,
            order: i+1,
        }
    })
    updateListsPosition(newOrderedList)
}

async function getData () {
    await getTasks()
    getLists()
}

getData()

</script>

<template>
    
    <draggable 
        v-model="lists"
        group="lists" 
        @start="drag=true" 
        @end="reorderLists" 
        item-key="_uuid"
        tag="div"
        class="list__container"
    >
        <template #item="{element: list}">
            <List :title="list.title" :id="list._uuid">
                <draggable 
                    v-model="list.tasks"
                    group="tasks" 
                    @start="drag=true" 
                    @end="reorderTasks" 
                    item-key="_uuid"
                >
                    <template #item="{element: task}">
                        <Task :data="task"></Task>
                    </template>
                </draggable>
            </List>
        </template>
        <template #footer>
            <AddList></AddList>
        </template>
    </draggable>
</template>

<style>
.task {
    display: flex;
    justify-content: space-between;
}
.list__container {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
}
</style>

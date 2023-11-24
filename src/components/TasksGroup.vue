<script setup>
import { ref, reactive } from 'vue'
import { useTasksStore } from '../stores/tasks'


// stores
const taskStore = useTasksStore()
const { createTask } = taskStore

const props = defineProps({
    title: {
        type: String,
        default: 'Nueva lista'
    },
    id: {
        type: String,
    }
})

const showCreateTaskInput = ref(false)

const newTask = reactive({
    title: '',
})

const createNewTask = async () => {
    await createTask(newTask.title, props.id)
    cancelCreation()
}

const cancelCreation = () => {
    newTask.title = ''
    showCreateTaskInput.value = false
}


</script>

<template>
    <v-card
        color="blue-grey-lighten-5"
        width="300"
        max-height="80%"
        min-width="300"
    >
        <v-toolbar color="tranparent" density="compact">
            <v-toolbar-title class="text-h6">
                {{ props.title }}
            </v-toolbar-title>

            <template v-slot:append>
                <v-btn density="comfortable" icon="mdi-dots-vertical"></v-btn>
            </template>
        </v-toolbar>
        <v-card-text class="pa-2 py-0">
            <slot></slot>
        </v-card-text>
        <v-card-actions class="pt-0">
            <v-card v-if="showCreateTaskInput" color="transparent" class="w-100 input--focus" elevation="0">
                <v-textarea 
                    v-model="newTask.title"
                    hide-details
                    variant="solo"
                    rows="2"
                    auto-grow
                    density="compact"
                    placeholder="Insert the task title"
                    ></v-textarea>
                <v-card-actions class="px-0">
                    <v-btn color="primary" variant="flat" size="small" @click="createNewTask" class="px-4">Add task</v-btn>
                    <v-btn @click="cancelCreation" density="comfortable" icon="mdi-close"></v-btn>
                </v-card-actions>
            </v-card>
            <v-btn v-else prepend-icon="mdi-plus" class="flex-grow-1 justify-start" @click="showCreateTaskInput = true">
                Add new task
            </v-btn>
        </v-card-actions>
  </v-card>
</template>

<style scoped>
    .input--focus {
        z-index: 3000;
    }
</style>

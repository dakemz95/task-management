<script setup>
import { ref, reactive } from 'vue'
import { useTasksStore } from '../stores/tasks'
import dayjs from 'dayjs';

const taskStore = useTasksStore()
const { updateTask, deleteTask } = taskStore

const props = defineProps(['data'])
const { _uuid: id, title, description, status, finalizationDate } = reactive(props.data)
const detailsModal = ref(false)

const editTitle = ref(false)
const editDescription = ref(false)
const showDatePicker = ref(false)

const toggleDetails = () => {
    detailsModal.value = !detailsModal.value
}

const taskData = reactive(props.data)

const resetInputs = () => {
    editTitle.value = false
    editDescription.value = false
}

const changeStatus = () => {
    taskData.status = !taskData.status
    updateData()
}

const updateData = async () => {
    await updateTask( id, props.data )
    editTitle.value = false
    editDescription.value = false
    showDatePicker.value = false
    resetInputs()
}

const deleteCurrentTask = async  () => {
    await deleteTask( id )
    detailsModal.value=false
}

</script>

<template>
    <v-card class="my-2" @click="toggleDetails">
        <v-toolbar color="white" density="compact">
            <v-toolbar-title class="text-subtitle-1">
                {{ title }}
            </v-toolbar-title>
        </v-toolbar>

        <v-dialog
            v-model="detailsModal"
            class="d-flex align-center"
        >
            <v-card
                width="600"
                max-width="90%"
                max-height="90%"
                height="400"
                class="mx-auto"
                color="blue-grey-lighten-5"
            >
                <v-toolbar color="tranparent" density="compact">
                    <v-text-field
                        v-if="editTitle" 
                        v-model="taskData.title"
                        hide-details
                        variant="outlined"
                        density="compact"
                        class="text-h6 pl-4"
                        append-icon="mdi-check"
                        @click:append="updateData"
                    ></v-text-field>
                    <v-toolbar-title v-else class="text-h6" @click="() => editTitle=true">
                        {{ taskData.title }}
                    </v-toolbar-title>

                    <v-spacer></v-spacer>
    
                    <template v-slot:append>
                        <v-btn color="grey-darken-1" density="comfortable" variant="text" icon="mdi-close" @click="toggleDetails"></v-btn>
                    </template>
                </v-toolbar>

                <v-card-text class="pt-0">
                    <p><b>Status: </b> <span :class="taskData.status ?'text-success' : 'text-danger'"> {{ taskData.status == true ? 'Complete' : 'Incomplete' }} </span></p>
                    <p><b>Finalization date: </b> {{ dayjs(taskData.finalizationDate).format('DD-MM-YYYY') }} </p>


                    <p class="mt-4"><b>Description: </b></p>
                    <v-textarea 
                        v-if="!taskData.description || editDescription"
                        v-model="taskData.description"
                        hide-details
                        variant="solo"
                        auto-grow
                        class="mb-4 w-100 h-auto"
                        density="compact"
                        placeholder="Insert the task title"
                        append-inner-icon="mdi-close"
                        @click:append-inner="resetInputs"
                    ></v-textarea>
                    <v-btn v-if="!taskData.description || editDescription" color="primary" size="small" @click="updateData"> Update </v-btn>

                    <div class="w-100" v-else @click="() => editDescription=true">{{ taskData.description }}</div>
                </v-card-text>
                
                <v-card-actions class="d-flex justify-space-between">
                    <v-row>
                        <v-col>
                            <v-btn variant="outlined" size="small" width="100%" @click="showDatePicker=true"> 
                                change Finalization date
                                <v-dialog v-model="showDatePicker">
                                    <v-row justify="center" align="center">
                                        <v-date-picker v-model="taskData.finalizationDate" elevation="24" @update:modelValue="updateData"></v-date-picker>
                                    </v-row>
                                </v-dialog>
                            </v-btn>
                        </v-col>
                        <v-col>
                            <v-btn variant="outlined" size="small" width="100%" @click="changeStatus"> Change status </v-btn>
                        </v-col>
                        <v-col>
                            <v-btn color="danger" variant="flat" size="small" width="100%" @click="deleteCurrentTask"> Delete task</v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
    
            </v-card>
        </v-dialog>
    </v-card>
</template>

<style scoped></style>

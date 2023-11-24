<script setup>
import { ref, computed } from 'vue'
import { useListsStore } from '@/stores/lists';

const showCreateListInput = ref(false)

// stores
const listStore = useListsStore()
const { createList } = listStore

const newListTitle = ref('')
const color = computed(() => {
    return showCreateListInput.value ? 'blue-grey-lighten-5' : ''
})

const createNewList = async () => {
    await createList(newListTitle.value)
    cancelCreation()
}

const cancelCreation = () => {
    newListTitle.value = ''
    showCreateListInput.value = false
}

</script>

<template>
    <v-card
        width="300"
        min-width="300"
        max-height="80%"
        class="h-auto"
        :color="color"
    >
        <v-btn v-if="!showCreateListInput" @click="showCreateListInput = true" prepend-icon="mdi-plus" variant="text" class="w-100 justify-start task_card">Add new list</v-btn>
        <template v-else>
            <v-card-text class="pa-2 pb-0">
                <v-text-field v-model="newListTitle" hide-details variant="solo" density="compact"></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" variant="flat" size="small" @click="createNewList" class="px-4">Add list</v-btn>
                <v-btn @click="cancelCreation" density="comfortable" icon="mdi-close"></v-btn>
            </v-card-actions>
        </template>
  </v-card>
</template>

<style scoped>
.task_card {
    background-color: #26323890;
    color: #fff;
}
</style>

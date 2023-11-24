<script setup>
import { ref } from 'vue'

const drawer = ref(false)

</script>

<template>
    <v-app>
        <v-app-bar title="task-management">
            <template v-slot:prepend>
                <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            </template>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer">
            <v-list>
                <v-list-item title="Navigation"></v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main class="overflow-x-auto">
            <v-container fluid >
                <RouterView />
            </v-container>
        </v-main>
    </v-app>
</template>

<style scoped></style>

<template>
    <div class="container mt-5">
        <h2>Add a New Task</h2>

        <!-- Input field for entering new task -->
        <input type="text" v-model="newTask" class="form-control mb-2" placeholder="Enter task" />

        <!-- Button to trigger task submission -->
        <button class="btn btn-success" @click="submitTask">Add</button>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTodoStore } from '../../stores/todoStore';

const todoStore = useTodoStore();
const router = useRouter();
const newTask = ref('');

// Function to submit a new task
async function submitTask() {
    if (newTask.value.trim()) {
        try {
            await todoStore.addTask(newTask.value.trim());
            newTask.value = '';
            router.push({ name: 'dashboard' });
        } catch (error) {
            alert("Failed to add task. Please try again.");
        }
    }
}
</script>

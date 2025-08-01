<template>
    <div class="container mt-5">
        <h2>Task List</h2>

        <!-- Link to the add task page -->
        <RouterLink to="/post/addTask" class="btn btn-primary">Add Task</RouterLink>

        <!-- If there are tasks, display them using the TodoItem component -->
        <div class="my-4" v-if="tasks.length > 0">
            <TodoItem v-for="task in tasks" :key="task.id" :task="task" @taskComplete="toggleComplete(task)"
                @removeTodo="removeTask(task)" @updateTodo="(newDesc) => updateTask(task, newDesc)" />
        </div>

        <!-- Message to show if there are no tasks -->
        <div v-else class="text-muted">No tasks found.</div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/authStore';
import { RouterLink } from 'vue-router';
import TodoItem from './TodoItem.vue';
import { computed, onMounted } from 'vue';
import type { Task } from '../models/task';

// Access the authentication store
const authStore = useAuthStore();

// Fetch tasks when the component is mounted
onMounted(() => {
    authStore.fetchTasks();
});

// Reactive computed property to get the current user's tasks
const tasks = computed(() => authStore.currentUser?.tasks ?? []);

// Toggle the completed state of a task
function toggleComplete(task: Task) {
    task.completed = !task.completed;
}

// Remove a task using the store
function removeTask(task: Task) {
    authStore.removeTask(task);
}

// Update a task's description using the store
function updateTask(task: Task, newDescription: string) {
    authStore.updateTask(task, newDescription);
}
</script>

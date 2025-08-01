<template>
    <div class="container mt-5">
        <h2>Task List</h2>

        <!-- Link to the add task page -->
        <RouterLink to="/post/addTask" class="btn btn-primary">Add Task</RouterLink>

        <!-- If there are tasks, display them using the TodoItem component -->
        <div class="my-4" v-if="tasks.length > 0">
            <!-- TODO: implement the component -->
            <TodoItem v-for="task in tasks" :key="task.id" :task="task" />
        </div>

        <!-- Message to show if there are no tasks -->
        <div v-else class="text-muted">No tasks found.</div>
    </div>
</template>

<script setup lang="ts">
// import { useAuthStore } from '../stores/authStore';
import { computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import TodoItem from '../../components/TodoItem.vue';
import { useTodoStore } from '../../stores/todoStore';

// Access the authentication store
// const authStore = useAuthStore();
const todoStore = useTodoStore();
// Fetch tasks when the component is mounted
onMounted(() => {
    todoStore.fetchTasks();
});

// Reactive computed property to get the current user's tasks
const tasks = computed(() => todoStore.tasks);

</script>

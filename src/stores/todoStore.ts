import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import type { Task } from "../models/task";
import axios from "../services/axios";

// Define the authentication store using the setup-style Pinia API
export const useTodoStore = defineStore("todo", () => {
  // Computed property: tasks of the current user
  const tasks: Ref<Task[]> = ref([]);

  // Fetch tasks for the current user
  async function fetchTasks() {
    try {
      const response = await axios.get("/user/toDo");

      // Update tasks in currentUser
      tasks.value = response.data;
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  }

  // Add a new task for the current user
  async function addTask(description: string) {
    // TODO: implement add task
  }

  // Update an existing task's description
  async function updateTask() {
    // TODO: implement update task
  }

  // Delete a task from current user's list
  async function removeTask() {
    // TODO: implement remove task
  }

  // Expose state and functions
  return {
    addTask,
    tasks,
    removeTask,

    updateTask,
    fetchTasks,
  };
});

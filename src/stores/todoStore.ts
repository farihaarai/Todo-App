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
    try {
      const response = await axios.post("/user/toDo", { description });
      const createdTask = response.data;

      // Add task to local user tasks
      tasks.value.push(createdTask);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  }

  // Update an existing task's description
  async function updateTask(task: Task, newDescription: string) {
    try {
      const response = await axios.put(`/user/toDo/${task.id}`, {
        description: newDescription,
      });

      // Update local task list
      const updatedTask = response.data;
      const targetTask = tasks.value.find((t) => t.id === task.id);
      if (targetTask) {
        targetTask.description = updatedTask.description;
      }
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  }

  // Delete a task from current user's list
  async function removeTask(task: Task) {
    try {
      await axios.delete(`/user/toDo/${task.id}`);

      // Remove task from local list
      const index = tasks.value.findIndex((t) => t.id === task.id);
      if (index !== -1) {
        tasks.value.splice(index, 1);
      }
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
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

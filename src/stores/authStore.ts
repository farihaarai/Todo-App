import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "../services/axios";
import { User } from "../models/user";
import type { Task } from "../models/task";

// Define the authentication store using the setup-style Pinia API
export const useAuthStore = defineStore("auth", () => {
  // State variables
  const users = ref<User[]>([]); // Optional: All registered users
  const currentUser = ref<User | null>(null); // Currently logged-in user
  const token = ref<string | null>(null); // JWT token for authentication

  // Computed property: tasks of the current user
  const tasks = computed(() => currentUser.value?.tasks || []);

  // Log in a user using email and password
  async function login(email: string, password: string) {
    try {
      const response = await axios.post("/login", {
        email,
        password,
      });

      const data = response.data;
      token.value = data.jwtToken;

      // Set token in default axios headers
      // axios.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;

      // Fetch user details after login
      await fetchCurrentUser();

      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  }

  // Fetch current user info from backend
  async function fetchCurrentUser() {
    if (!token.value) return;
    try {
      const response = await axios.get("/user");
      const data = response.data;

      // Create User object from response
      currentUser.value = new User(
        data.name,
        "",
        data.email,
        data.gender,
        data.age,
        data.tasks || []
      );

      console.log("Fetched current user:", currentUser.value);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  // Fetch tasks for the current user
  async function fetchTasks() {
    if (!token.value || !currentUser.value) return;

    try {
      const response = await axios.get("/user/toDo");

      // Update tasks in currentUser
      if (currentUser.value) {
        currentUser.value.tasks = response.data;
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  }

  // Update user profile information
  async function updateProfile(name: string, gender: string, age: number) {
    if (!token.value) return false;

    try {
      const response = await axios.put("/user", { name, gender, age });
      console.log("User details changed:", response);

      // Update currentUser locally
      if (currentUser.value) {
        currentUser.value.name = name;
        currentUser.value.gender = gender;
        currentUser.value.age = age;
      }

      return true;
    } catch (error: any) {
      if (error.response) {
        console.error("Profile update failed:", error.response.data);
      } else {
        console.error("Profile update failed:", error);
      }
      return false;
    }
  }

  // Change the user's password
  async function changePassword(currentPassword: string, newPassword: string) {
    console.log("Sending password change request...");
    console.log("Using token:", token.value);
    try {
      const response = await axios.put("/user/password", {
        currentPassword,
        newPassword,
      });
      console.log("Password change response:", response);
    } catch (error) {
      console.error("Password change failed:", error);
    }
  }

  // Register a new user
  async function signup(
    username: string,
    password: string,
    email: string,
    gender: string,
    age: number
  ) {
    try {
      await axios.get("/registerUserGet", {
        params: { name: username, email, gender, age, password },
      });
      return true;
    } catch (error) {
      console.error("Signup failed:", error);
      return false;
    }
  }

  // Log out the current user
  function logout() {
    currentUser.value = null;
    token.value = null;

    // Remove token from axios default headers
    // delete axios.defaults.headers.common["Authorization"];
  }

  // Add a new task for the current user
  async function addTask(description: string) {
    if (!currentUser.value) return;

    try {
      const response = await axios.post("/user/toDo", { description });
      const createdTask = response.data;

      // Add task to local user tasks
      currentUser.value.tasks.push(createdTask);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  }

  // Update an existing task's description
  async function updateTask(task: Task, newDescription: string) {
    if (!token.value || !currentUser.value) return;

    try {
      const response = await axios.put(`/user/toDo/${task.id}`, {
        description: newDescription,
      });

      // Update local task list
      const updatedTask = response.data;
      const targetTask = currentUser.value.tasks.find((t) => t.id === task.id);
      if (targetTask) {
        targetTask.description = updatedTask.description;
      }
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  }

  // Delete a task from current user's list
  async function removeTask(task: Task) {
    if (!currentUser.value) return;

    try {
      await axios.delete(`/user/toDo/${task.id}`);

      // Remove task from local list
      const index = currentUser.value.tasks.findIndex((t) => t.id === task.id);
      if (index !== -1) {
        currentUser.value.tasks.splice(index, 1);
      }
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  }

  // Expose state and functions
  return {
    users,
    currentUser,
    login,
    signup,
    logout,
    addTask,
    tasks,
    removeTask,
    token,
    fetchCurrentUser,
    changePassword,
    updateTask,
    fetchTasks,
    updateProfile,
  };
});

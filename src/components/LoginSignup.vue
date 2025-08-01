<template>
    <div class="container mt-5">
        <!-- Tab navigation for Login and Signup -->
        <ul class="nav nav-tabs mb-4">
            <li class="nav-item">
                <a class="nav-link" :class="{ active: tab === 'login' }" @click="goToTab('login')">Login</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" :class="{ active: tab === 'signup' }" @click="goToTab('signup')">Signup</a>
            </li>
        </ul>

        <!-- Login Form -->
        <div v-if="tab === 'login'">
            <div class="form-outline mb-4">
                <input type="text" v-model="loginData.email" />
                <label>Email</label>
            </div>
            <div class="form-outline mb-4">
                <input type="password" v-model="loginData.password" />
                <label>Password</label>
            </div>
            <button class="btn btn-primary" @click="login">Login</button>
        </div>

        <!-- Signup Form -->
        <div v-if="tab === 'signup'">
            <!-- Username input -->
            <div class="form-outline mb-4">
                <input type="text" v-model="signupData.name" />
                <label class="form-label">Username</label>
            </div>

            <!-- Email input -->
            <div class="form-outline mb-4">
                <input type="email" v-model="signupData.email" />
                <label class="form-label">Email</label>
            </div>

            <!-- Password input -->
            <div class="form-outline mb-4">
                <input type="password" v-model="signupData.password" />
                <label class="form-label">Password</label>
            </div>

            <!-- Gender input -->
            <div class="form-outline mb-4">
                <input type="text" v-model="signupData.gender" />
                <label class="form-label">Gender</label>
            </div>

            <!-- Age input -->
            <div class="form-outline mb-4">
                <input type="number" v-model="signupData.age" />
                <label class="form-label">Age</label>
            </div>

            <button class="btn btn-success" @click="signup">Signup</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

// Initialize auth store and router
const authStore = useAuthStore();
const router = useRouter();

// State to toggle between 'login' and 'signup' tabs
const tab = ref<'login' | 'signup'>('login');

// Reactive object for login form data
const loginData = ref({ email: '', password: '' });

// Reactive object for signup form data
const signupData = ref({
    name: '',
    email: '',
    password: '',
    gender: '',
    age: 0,
});

// Method to switch tabs and optionally update the route
function goToTab(tabName: 'login' | 'signup') {
    tab.value = tabName;
    if (tabName === 'signup') {
        router.push({ name: "signup" }); // Optional: named route for signup
    } else {
        router.push('/'); // Default route for login
    }
}

// Handles login logic
const login = async () => {
    const success = await authStore.login(loginData.value.email, loginData.value.password);
    if (success) {
        await authStore.fetchCurrentUser(); // Fetch user info after successful login
        router.push({ name: 'dashboard' }); // Redirect to dashboard
    } else {
        alert("Login failed"); // Display login error
    }
};

// Handles signup logic
async function signup() {
    const { name, password, email, gender, age } = signupData.value;
    const success = await authStore.signup(name, password, email, gender, age);
    if (success) {
        tab.value = 'login'; // Switch to login tab after signup
        router.push({ name: 'login' }); // Optional: redirect to login page
    } else {
        alert('Username already exists'); // Display signup error
    }
}
</script>

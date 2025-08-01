<template>
    <div class="form-outline mb-4">
        <input type="text" v-model="loginData.email" />
        <label>Email</label>
    </div>
    <div class="form-outline mb-4">
        <input type="password" :value="loginData.password" />
        <label>Password</label>
    </div>
    <button class="btn btn-primary" @click="login">Login</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/authStore';


// Initialize auth store and router
const authStore = useAuthStore();
const router = useRouter();

// Reactive object for login form data
const loginData = ref({ email: '', password: '' });

// Handles login logic
const login = async () => {
    console.log("Logging in", loginData.value);

    const success = await authStore.login(loginData.value.email, loginData.value.password);
    if (success) {
        await authStore.fetchCurrentUser(); // Fetch user info after successful login
        router.push({ name: 'dashboard' }); // Redirect to dashboard
    } else {
        alert("Login failed"); // Display login error
    }
};

console.debug(login);


</script>

<style scoped></style>
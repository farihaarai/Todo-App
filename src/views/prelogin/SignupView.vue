<template>
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
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/authStore';


// Initialize auth store and router
const authStore = useAuthStore();
const router = useRouter();


// Reactive object for signup form data
const signupData = ref({
    name: '',
    email: '',
    password: '',
    gender: '',
    age: 0,
});




// Handles signup logic
async function signup() {
    const { name, password, email, gender, age } = signupData.value;
    const success = await authStore.signup(name, password, email, gender, age);
    if (success) {
        router.push({ name: 'login' }); // Optional: redirect to login page
    } else {
        alert('Username already exists'); // Display signup error
    }
}
</script>

<style scoped></style>
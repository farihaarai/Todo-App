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
        <!-- <div v-if="tab === 'login' || tab === 'signup'"> -->
        <router-view />
        <!-- </div> -->

    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Initialize auth store and router
const route = useRoute();
const router = useRouter();

// State to toggle between 'login' and 'signup' tabs
// const tab = ref<string>((route.name?.toString()) ?? 'login');
const tab = computed<string>(() => (route.name?.toString()) ?? 'login');


// Method to switch tabs and optionally update the route
function goToTab(tabName: 'login' | 'signup') {
    // tab.value = tabName;
    if (tabName === 'signup') {
        router.push({ name: "signup" }); // Optional: named route for signup
    } else {
        router.push('/'); // Default route for login
    }
}

</script>

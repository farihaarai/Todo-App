<template>
    <div class="container mt-5">
        <h2 class="text-center mb-4">Edit Profile</h2>

        <!-- Profile edit form -->
        <form @submit.prevent="updateProfile" class="w-50 mx-auto">
            <!-- Input for name -->
            <MDBInput label="Name" v-model="name" type="text" class="mb-3" required />

            <!-- Input for gender -->
            <MDBInput label="Gender" v-model="gender" type="text" class="mb-3" required />

            <!-- Input for age -->
            <MDBInput label="Age" v-model="age" type="number" min="1" class="mb-4" required />

            <!-- Submit button -->
            <MDBBtn type="submit" color="primary" class="w-100">Save Changes</MDBBtn>
        </form>
    </div>
</template>

<script setup lang="ts">
// Import necessary tools and components
import { ref, watch } from 'vue';
import { useAuthStore } from '../../stores/authStore'; // Import auth store
import { MDBInput, MDBBtn } from 'mdb-vue-ui-kit'; // Import MDB components
import router from '../../router'; // Import Vue Router

// Access the authentication store
const authStore = useAuthStore();

// Define reactive variables for the form fields
const name = ref<string>('');
const gender = ref<string>('');
const age = ref<number>(0);

// Watch for changes in currentUser and populate form when data is available
watch(
    () => authStore.currentUser,
    async (user) => {
        // If user is not loaded but a token is available, fetch the user
        if (!user && authStore.token) {
            await authStore.fetchCurrentUser();
            user = authStore.currentUser;
        }

        // If user data is available, populate the form
        if (user) {
            name.value = user.name ?? '';
            gender.value = user.gender ?? '';
            age.value = user.age ?? 0;
        }
    },
    { immediate: true } // Run the watcher immediately on component load
);

// Function to update the user's profile
async function updateProfile() {
    try {
        // Call the updateProfile method from authStore
        const response = await authStore.updateProfile(name.value, gender.value, age.value);

        if (response) {
            alert('Profile updated successfully!');
        }
    } catch (error) {
        console.error('Failed to update profile:', error);
        alert('Something went wrong while updating your profile.');
    }

    // Redirect to dashboard after update
    router.push({ name: 'dashboard' });
}
</script>

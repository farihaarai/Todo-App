<template>
    <div class="container mt-5" style="max-width: 500px;">
        <!-- Page Heading -->
        <h3 class="mb-4">Change Password</h3>

        <!-- Input for old/current password -->
        <MDBInput v-model="currentPassword" label="Old Password" type="password" class="mb-4" />

        <!-- Input for new password -->
        <MDBInput v-model="newPassword" label="New Password" type="password" class="mb-4" />

        <!-- Submit button -->
        <MDBBtn color="primary" class="w-100" @click="submitPassword">
            Submit
        </MDBBtn>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { MDBInput, MDBBtn } from 'mdb-vue-ui-kit'
import { useAuthStore } from '../../stores/authStore'

// Access the router instance for navigation
const router = useRouter()

// Reactive input fields for password values
const currentPassword = ref('')
const newPassword = ref('')

// Use Pinia store to handle authentication logic
const authStore = useAuthStore()

/**
 * Submit the password change form
 */
async function submitPassword() {
    console.log("Submit button clicked")

    // Simple validation
    if (!currentPassword.value || !newPassword.value) {
        alert('Please fill in both fields.')
        return
    }

    try {
        // Call store action to change password
        await authStore.changePassword(currentPassword.value, newPassword.value)

        // Notify user and redirect to dashboard
        alert('Password changed successfully.')
        router.push({ name: 'dashboard' })
    } catch (error) {
        // Show error if password change fails
        alert('Failed to change password. Please try again.')
        console.error(error)
    }
}
</script>

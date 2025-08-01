<template>
    <div>
        <!-- Main container visible after login -->

        <!-- Navbar section -->
        <nav class="navbar navbar-expand-lg navbar-light bg-primary px-4">
            <div class="container-fluid d-flex justify-content-between align-items-center">

                <!-- Home icon (navigates to dashboard) -->
                <div @click="gotoDashboard" style="cursor: pointer">
                    <i class="fas fa-home text-white fs-4"></i>
                </div>

                <!-- User dropdown menu -->
                <div class="d-flex align-items-center gap-3">
                    <MDBDropdown v-model="showDropDown">
                        <!-- Dropdown toggle showing user icon and name -->
                        <MDBDropdownToggle color="light" class="text-dark" @click="OpenDropdown">
                            <i class="fas fa-user"></i> {{ authStore.currentUser?.name || '' }}
                        </MDBDropdownToggle>

                        <!-- Dropdown options -->
                        <MDBDropdownMenu class="p-2 border bg-light">
                            <!-- Navigates to profile editing -->
                            <MDBDropdownItem tag="button" @click="goToProfile">Edit Profile</MDBDropdownItem>

                            <!-- Navigates to change password page -->
                            <MDBDropdownItem tag="button" @click="goToChangePassword">Change Password</MDBDropdownItem>

                            <!-- Logs out the user -->
                            <MDBDropdownItem tag="button" @click="logout">Logout</MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                </div>
            </div>
        </nav>

        <!-- Child route content will be rendered here -->
        <router-view />
    </div>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router';
import {
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
} from 'mdb-vue-ui-kit';
import { ref } from 'vue';
import { useAuthStore } from '../../stores/authStore';


const router = useRouter();
const showDropDown = ref(false);
const authStore = useAuthStore();


//  Logs out the user, clears session, and redirects to login page
function logout() {
    authStore.logout();
    router.push('/');
}


//  Navigates to the Change Password page
function goToChangePassword() {
    router.push({ name: "changePassword" });
}

// Toggles the dropdown menu
function OpenDropdown() {
    showDropDown.value = !showDropDown.value;
}


//  Navigates to Profile page (fetches user if not loaded)
async function goToProfile() {
    if (!authStore.currentUser && authStore.token) {
        await authStore.fetchCurrentUser();
    }
    router.push({ name: "profile" });
}


//  Navigates to the Dashboard
function gotoDashboard() {
    router.push({ name: "dashboard" });
}
</script>

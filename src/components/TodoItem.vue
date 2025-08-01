<template>
    <div class="itembox">
        <!-- Checkbox to toggle completion -->
        <input type="checkbox" :checked="task.completed" @change="onTaskComplete" />

        <!-- If editing, show input; otherwise show text -->
        <div v-if="isEditing" class="edit-container">
            <input v-model="editableDescription" class="form-control" />
            <div class="button-group">
                <button @click="onUpdateTodo" class="btn btn-success btn-sm">Save</button>
                <button @click="cancelEdit" class="btn btn-secondary btn-sm">Cancel</button>
            </div>
        </div>

        <div v-else class="description-container">
            <span :class="{ completed: task.completed }">{{ task.description }}</span>
            <div class="button-group">
                <button @click="startEditing" class="btn btn-warning btn-sm">Edit</button>
                <button :disabled="!task.completed" @click="onRemoveTodo" class="btn btn-danger btn-sm">x</button>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Task } from '../models/task';

const props = defineProps<{
    task: Task;
}>();

const emit = defineEmits<{
    (e: 'taskComplete'): void;
    (e: 'removeTodo'): void;
    (e: 'updateTodo', newDescription: string): void;
}>();

const isEditing = ref(false);
const editableDescription = ref(props.task.description);

function startEditing() {
    isEditing.value = true;
    editableDescription.value = props.task.description;
}

function cancelEdit() {
    isEditing.value = false;
}

function onUpdateTodo() {
    emit('updateTodo', editableDescription.value);
    isEditing.value = false;
}

function onTaskComplete() {
    emit('taskComplete');
}

function onRemoveTodo() {
    emit('removeTodo');
}
</script>

<style scoped>
.itembox {
    margin: 10px;
    padding: 10px;
    border: 1px solid grey;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.completed {
    text-decoration: line-through;
    color: grey;
    opacity: 0.7;
}

button {
    padding: 4px 8px;
}

button:disabled {
    background-color: grey;
    cursor: not-allowed;
    opacity: 0.5;
}

.description-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.button-group {
    display: flex;
    gap: 5px;
}

.edit-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 10px;
}
</style>

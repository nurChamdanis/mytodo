<!-- TodoForm.vue -->
<script setup>
import { ref } from 'vue';

const emit = defineEmits(['addTodo']); // Emitting an event when a todo is added
const newTodo = ref('');

const addTodo = () => {
    if (newTodo.value.trim()) {
        emit('addTodo', newTodo.value); // Emit the new todo value
        newTodo.value = ''; // Clear the input
    }
};
</script>

<template>
    <div>
        <h2>Add New Todo</h2>
        <input v-model="newTodo" placeholder="New Todo" required />
        <button @click="addTodo">Add Todo</button>
    </div>
</template>

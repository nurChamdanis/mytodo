<script setup>
import { ref } from 'vue';

// Fetch the todos list
const todos = ref([]);
const error = ref(null);

// Fetch todos when the component is mounted
const fetchTodos = async () => {
  try {
    const { data } = await useFetch('/api/todos');
    todos.value = data.value;
  } catch (err) {
    error.value = 'Error fetching todos';
    console.error(error.value, err);
  }
};

// Call fetchTodos when component is created
await fetchTodos();

// State to store the new todo description and form visibility
const newDescript = ref('');
const showForm = ref(false);

const addTodos = async () => {
  try {
    const response = await $fetch('/api/todos', {
      method: 'POST',
      body: { todos: newDescript.value },
    });

    if (response) {
      // Re-fetch todos to update the list
      await fetchTodos();
    }

    newDescript.value = '';
    showForm.value = false; // Hide the form after adding a todo
  } catch (err) {
    console.error('Error adding todo:', err);
  }
};
</script>

<template>
  <div>
    <div class="header">
      <h1>Todo</h1>
      <button @click="showForm = !showForm">
        {{ showForm ? 'Hide Todo Form' : 'New Todo' }}
      </button>
    </div>

    <!-- Form for adding new todo -->
    <div v-if="showForm">
      <h2>Add Todo</h2>
      <form @submit.prevent="addTodos">
        <input v-model="newDescript" placeholder="Todo Description" required />
        <button type="submit">Add Todo</button>
      </form>
    </div>

    <!-- Todo List -->
    <div v-else>
      <h2>Todo List</h2>
      <ul v-if="todos.length > 0">
        <li v-for="(todo, index) in todos" :key="index">{{ todo.description }}</li>
      </ul>
      <p v-else>No todos available.</p>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header h1 {
  margin: 0;
}

.header button {
  margin-left: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 5px 0;
}

form {
  margin-top: 10px;
}
</style>

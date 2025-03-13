<script setup lang="ts">
import { useHttp } from '@/composables/useHttp'
import Spinner from '@/assets/spinner.svg'

const getRandomId = () => Math.floor(Math.random() * 100) + 1;

const randomPostUrl = `https://jsonplaceholder.typicode.com/posts/${getRandomId()}`;

const { data, loading, success, error, fetchData } = useHttp<{ userId: number, id: number, title: string, body: string }>(
    randomPostUrl,
    { method: 'GET' }
);

fetchData();
</script>

<template>
  <h2>Задание 2</h2>
  <div class="container">
    <Spinner v-if="loading" />
    <div v-else>
      <div v-if="success" class="card">
        <div class="card-header">
          <h2>{{ data.title }}</h2>
          <p class="user-id">User ID: {{ data.userId }}</p>
        </div>
        <div class="card-body">
          <p>{{ data.body }}</p>
        </div>
      </div>
      <div v-if="!!error" class="error">{{ error }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f7fb;
  padding: 20px;
}

.error {
  color: red;
  font-size: 16px;
  margin-top: 20px;
}

.card {
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
  border-bottom: 2px solid #f2f2f2;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.card-header h2 {
  font-size: 1.5rem;
  color: #333;
  margin: 0;
}

.user-id {
  font-size: 0.9rem;
  color: #666;
}

.card-body p {
  font-size: 1rem;
  color: #444;
  line-height: 1.6;
}
</style>
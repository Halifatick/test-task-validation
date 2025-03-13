<script setup lang="ts">
import { useHttp } from '@/composables/useHttp'
import Spinner from '@/assets/spinner.svg'
const { data, loading, success, error, fetchData } = useHttp('https://dog.ceo/api/breeds/image/random', { method: 'GET' });

fetchData();
</script>

<template>
  <h2>Задание 2</h2>
  <div class="container">
    <Spinner v-if="loading" />
    <div v-else>
      <img v-if="success" :src="data.message">
      <div v-if="!!error">{{ error }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
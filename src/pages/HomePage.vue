<script setup lang="ts">
import { useLifecycleLogger } from '@/common/hooks/lifecycleLogger.ts'
import ValidationTest from '@/components/ValidationTest.vue'
import HttpTest from '@/components/HttpTest.vue'

useLifecycleLogger({ name: 'HomePage' })
</script>

<template>
  <div class="container">
    <ValidationTest />
    <HttpTest/>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>

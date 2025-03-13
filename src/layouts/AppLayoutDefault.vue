<script setup lang="ts">
import { useLifecycleLogger } from '@/common/hooks/lifecycleLogger.ts'

useLifecycleLogger({ name: 'AppLayoutDefault' })
</script>

<template>
    <main class="flex flex-auto">
        <div class="container mx-auto">
            <slot />
        </div>
    </main>
</template>

<style scoped lang="scss">

</style>

<script setup lang="ts">
import { useRoute } from 'vue-router'

import { useLifecycleLogger } from '@/common/hooks/lifecycleLogger.ts'

const route = useRoute()

useLifecycleLogger({ name: 'AppLayout' })
</script>

<template>
    <component :is="route.meta.layoutComponent || 'div'">
        <slot />
    </component>
</template>

<style scoped lang="scss"></style>

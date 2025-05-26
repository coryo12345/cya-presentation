<template>asd</template>

<script setup>
import { endings } from '@/game/endings';

const emit = defineEmits(['back']);

const endingsInfo = computed(() => endings.getEndingsInfo);
</script>

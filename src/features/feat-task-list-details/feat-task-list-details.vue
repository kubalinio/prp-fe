<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div>
    <h1>Task List Details</h1>

    <p>{{ route.params.id }}</p>
  </div>
</template>

<style lang=""></style>

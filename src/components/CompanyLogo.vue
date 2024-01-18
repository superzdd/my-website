<script setup lang="ts">
import type { Company } from '~/composables/company'

defineProps<{
  ele: Company
}>()
</script>

<template>
  <span flex="~" m-1 items-center justify-start font-size-3>
    <img :src="ele.imgSrc" :alt="ele.name" mr-1>
    {{ ele.name }}
  </span>
</template>

<style>
img {
  width: 2rem;
  height: 2rem;
}
</style>

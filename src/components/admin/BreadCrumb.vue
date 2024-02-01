<template>
  <VBreadcrumbs :items="$route.matched" class="breadcrumbs">
    <template #title="{ item }">{{ item.meta.name }}</template>
    <template #divider>
      <v-icon icon="mdi-chevron-right" size="small"></v-icon>
    </template>
  </VBreadcrumbs>
</template>

<script setup>

</script>

<style scoped lang="sass">
.breadcrumbs
  margin: 5px 0 0 10px
  font-size: 0.9rem
  font-weight: 500
  color: teal
</style>

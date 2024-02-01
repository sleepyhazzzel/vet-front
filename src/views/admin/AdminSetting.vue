<template>
<VContainer class="py-0">
  <VRow class="px-2">
    <VCol cols="12" md="4">
      <VRow>
        <VCol cols="12">
          <AddAdmin />
        </VCol>
        <VCol cols="12">
          <EditAdmin />
        </VCol>
      </VRow>
    </VCol>
    <VCol cols="12" md="8">

    </VCol>
  </VRow>
</VContainer>
</template>
<script setup>
import AddAdmin from '@/components/admin/AddAdmin.vue'
import EditAdmin from '@/components/admin/EditAdmin.vue'
</script>

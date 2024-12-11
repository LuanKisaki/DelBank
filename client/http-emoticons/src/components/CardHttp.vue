<template>
  <v-card v-for="status in statuses" :key="status.code" :src="status.image" class="w-100 "
    image="https://cdn.vuetifyjs.com/docs/images/one/create/feature.png" rounded="lg" min-height="8.8rem"
    variant="outlined">

    <template #image>
      <v-img position="top right" />
    </template>

    <template #title>
      <h2 class="text-h5 font-weight-bold">{{ status.code }} - {{ status.message }}</h2>
    </template>

    <template #subtitle>
      <div class="text-subtitle-1">
        {{ status.description }}.
      </div>
    </template>
    <template #actions>
        <v-btn color="primary" text @click="$emit('view-details', status)">
          Detalhes
        </v-btn>
        <v-btn color="error" text @click="$emit('remove', status.code)">
          Remover
        </v-btn>
    </template>
    <v-overlay opacity=".12" scrim="primary" contained model-value persistent />
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  name: 'StatusList',
  props: {
    statuses: {
      type: Array,
      required: true,
    },
  },
  emits: ['view-details', 'remove'],

});

</script>
<template>
  <v-row>
    <v-col
      v-for="status in statuses"
      :key="status.code"

    >
      <v-card outlined>
        <v-img :src="status.image" height="150px"></v-img>
        <v-card-title>{{ status.code }} - {{ status.message }}</v-card-title>
        <v-card-subtitle>{{ status.description }}</v-card-subtitle>
        <v-card-actions>
          <v-btn color="primary" text @click="$emit('view-details', status)">
            Detalhes
          </v-btn>
          <v-btn color="error" text @click="$emit('remove', status.code)">
            Remover
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

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

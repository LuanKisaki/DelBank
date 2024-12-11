<template>
  <v-btn fab color="primary" class="float-button " height="60px" @click="$emit('click')">
    <v-icon>mdi-plus</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FloatingButton',
});
</script>

<style scoped>
.float-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>

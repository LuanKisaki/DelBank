<script setup lang="ts">
import CardHttp from './CardHttp.vue';
import StatusList from './StatusList.vue';
</script>

<template>
  <v-list class="d-flex flex-column px-2 ga-4 align-center w-100 overflow-y-scroll " max-height="33rem">

    <CardHttp 
      :statuses="filteredStatus"
      @view-details="viewDetails"
      @remove="removeStatus"
    />

  </v-list>
</template>

<script lang="ts">

import filteredStatus from "./HelloWorld.vue";
import removeStatus from "./HelloWorld.vue";
import viewDetails from "./HelloWorld.vue";
</script>
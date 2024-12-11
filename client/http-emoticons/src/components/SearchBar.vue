<template>
  <v-text-field
    v-model="searchValue"
    label="Buscar status HTTP"
    outlined
    @input="onFilter"
  ></v-text-field>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'SearchBar',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue', 'filter'],
  setup(props, { emit }) {
    const searchValue = ref(props.modelValue);

    watch(searchValue, (newValue) => {
      emit('update:modelValue', newValue);
      emit('filter');
    });

    const onFilter = () => emit('filter');

    return { searchValue, onFilter };
  },
});
</script>

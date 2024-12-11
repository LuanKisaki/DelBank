<template>
  <v-app>
    <AppHeader />
    <v-container>
      <!-- Componente de barra de pesquisa -->
      <SearchBar v-model="search" />

      <!-- Lista de status -->
      <StatusList
        :statuses="filteredStatus"
        @view-details="viewDetails"
        @remove="removeStatus"
      />

      <!-- Diálogo de edição/adição -->
      <StatusDialog
        :dialog="detailsDialog"
        :status="selectedStatus"
        @update:dialog="detailsDialog = $event"
        @save="saveStatus"
      />

      <!-- Botão flutuante -->
      <FloatingButton @click="openNewStatusDialog" />
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import SearchBar from '../src/components/SearchBar.vue';
import StatusList from '../src/components/StatusList.vue';
import StatusDialog from '../src/components/StatusDialog.vue';
import FloatingButton from '../src/components/FloatingButton.vue';

export default defineComponent({
  components: {
    SearchBar,
    StatusList,
    StatusDialog,
    FloatingButton,
  },
  setup() {
    const search = ref('');
    const statusList = ref([
      // Exemplo de status iniciais
      { code: 200, message: 'OK', description: 'Success', image: '/ok.png' },
      { code: 404, message: 'Not Found', description: 'Error', image: '/not-found.png' },
    ]);

    const filteredStatus = computed(() => {
      // Filtra os status conforme a busca
      return statusList.value.filter(
        (status) =>
          status.message.toLowerCase().includes(search.value.toLowerCase()) ||
          status.code.toString().includes(search.value)
      );
    });

    const detailsDialog = ref(false);
    const selectedStatus = ref({ code: '', message: '', description: '', image: '' });

    const viewDetails = (status: any) => {
      selectedStatus.value = { ...status };
      detailsDialog.value = true;
    };

    const openNewStatusDialog = () => {
      selectedStatus.value = { code: '', message: '', description: '', image: '' };
      detailsDialog.value = true;
    };

    const saveStatus = (status: any) => {
      const existingIndex = statusList.value.findIndex((item) => item.code === status.code);

      if (existingIndex > -1) {
        statusList.value[existingIndex] = status;
      } else {
        statusList.value.push(status);
      }

      detailsDialog.value = false;
    };

    const removeStatus = (code: number) => {
      statusList.value = statusList.value.filter((status) => status.code !== code);
    };

    return {
      search,
      filteredStatus,
      detailsDialog,
      selectedStatus,
      viewDetails,
      openNewStatusDialog,
      saveStatus,
      removeStatus,
    };
  },
});
</script>

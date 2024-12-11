<template>
  <v-container class="fill-height justify-space-between mx-0 " max-width="100vw">
    <v-responsive class=" align-centerfill-height ml-2">
      <v-container class="d-flex flex-row mx-0 justify-self-center ga-6">
        <Header />

        <v-row class="d-flex flex-col ga-6 w-100 h-25">
          <v-container class="d-flex ga-4 px-0">
            <!-- <v-text-field v-model="search" label="Buscar status HTTP" @input="filterStatus" outlined></v-text-field>
            
            <v-col v-for="status in filteredStatus" :key="status.code">
              <v-card outlined>
                <v-img :src="status.image" height="150px"></v-img>

                <v-card-title>{{ status.code }} - {{ status.message }}</v-card-title>

                <v-card-subtitle>{{ status.description }}</v-card-subtitle>

                <v-card-actions>
                  <v-btn color="primary" text @click="viewDetails(status)">
                    Detalhes
                  </v-btn>
                  <v-btn color="error" text @click="removeStatus(status.code)">
                    Remover
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col> -->

            <SearchBar v-model="search" />

            <!-- Diálogo de edição/adição -->
            <StatusDialog
              :dialog="detailsDialog"
              :status="selectedStatus" @update:dialog="detailsDialog = $event"
              @save="saveStatus"
            />
            <!-- Botão flutuante para adicionar novos status -->
            <FloatingButton @click="openNewStatusDialog" />

          </v-container>
          <CardsList />
        </v-row>
      </v-container>
    </v-responsive>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import CardsList from './CardsList.vue';
import FloatingButton from './FloatingButton.vue';
import SearchBar from './SearchBar.vue';
import StatusList from './StatusList.vue';
import StatusDialog from './StatusDialog.vue';

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

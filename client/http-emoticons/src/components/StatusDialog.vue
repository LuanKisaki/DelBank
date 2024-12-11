<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="text-h5">
          {{ status.code ? 'Editar Status' : 'Novo Status' }}
        </span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="localStatus.code"
                label="Código"
                outlined
                :disabled="!!status.code"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="localStatus.message"
                label="Mensagem"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="localStatus.description"
                label="Descrição"
                outlined
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="localStatus.image"
                label="URL da Imagem"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" text @click="save">
          Salvar
        </v-btn>
        <v-btn color="grey" text @click="close">
          Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'StatusDialog',
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    status: {
      type: Object,
      required: true,
    },
  },
  emits: ['update:dialog', 'save'],
  setup(props, { emit }) {
    const localStatus = ref({ ...props.status });

    watch(
      () => props.status,
      (newStatus) => {
        localStatus.value = { ...newStatus };
      }
    );

    const close = () => emit('update:dialog', false);
    const save = () => {
      emit('save', localStatus.value);
      close();
    };

    return { localStatus, close, save };
  },
});
</script>

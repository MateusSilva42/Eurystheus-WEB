<template>
  <v-container>
    <v-dialog max-width="500" v-model="enableValue" :persistent="true"  >
      <template v-slot:default="{ isActive }">
        <v-card class="card">
            <v-card-title class="card-title">
                <span>{{ title }}</span>    
            </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Título" v-model="taskTitle" outlined></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea label="Descrição" v-model="taskDescription" outlined></v-textarea>
              </v-col>
              </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="error" variant="tonal" text="Cancelar" @click="$emit('close')"></v-btn>
            <v-btn color="success" variant="tonal" text="Salvar" @click="saveData"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:enable", "close"]);
const taskTitle = ref("");
const taskDescription = ref("");


const props = defineProps({
  title: { type: String, required: true },
  scope: { type: String, required: true, default: "new" },
  enable: { type: Boolean, required: true },
});

const enableValue = computed({
  get: () => props.enable,
  set: (value) => emit("update:enable", value),
})

const toast = useToast();

const saveData = async () => {
    toast.success("Tarefa salva com sucesso");
    emit("close");
}
  
</script>

<style>
.card-title {
  display: flex;
  justify-content: space-between;
  background-color: orangered;
  color: white;
}

</style>

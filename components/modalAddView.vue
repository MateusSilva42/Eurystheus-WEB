<template>
  <v-container>
    <v-dialog max-width="500" v-model="enableValue" :persistent="true"  >
      <template v-slot:default="{ isActive }">
        <v-card class="card">
            <v-card-title class="card-title">
                <span>Nova Tarefa</span>    
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
            <v-btn color="success" variant="tonal" text="Salvar" @click="saveData" :loading="loading"></v-btn>
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
const loading = ref(false);

const props = defineProps({
  enable: { type: Boolean, required: true },
  userId: { type: String, required: true},
});

const enableValue = computed({
  get: () => props.enable,
  set: (value) => emit("update:enable", value),
})

const toast = useToast();

const saveData = async () => {
    loading.value = true;
    try{
      if(taskTitle.value === "" || taskDescription.value === ""){
        toast.error("Preencha todos os campos");
        return;
      }

      const data = {
        title: taskTitle.value,
        content: taskDescription.value,
        userId: props.userId
      }

      const newTask = await useApi("task", {
        method: "POST",
        data
      });
      if(!newTask) throw new Error("Erro ao salvar tarefa");

      toast.success("Tarefa salva com sucesso");
      loading.value = false;
      emit("close");

    } catch(error:unknown){
        loading.value = false;
        toast.error("Erro ao salvar tarefa");
    }
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

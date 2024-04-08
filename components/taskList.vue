<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="title">
        <h2>{{ title }}</h2>
      </v-col>
    </v-row>
    <v-row class="task-list">
      <v-col cols="3" class="task-details">
        <v-container v-if="taskSelected">
          <v-row>
            <v-col cols="12">
              <v-row>
                <v-col cols="12">
                  <h2>Título da tarefa</h2>
                </v-col>
                <v-col cols="12">
                  <h3>Descrição da tarefa. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio et harum perferendis repellendus inventore quasi vitae sint veniam, magnam labore libero saepe cum itaque nobis, quo quis ab explicabo debitis.</h3>
                </v-col>
                <v-col cols="12">
                  <p>Criada em: 01/01/2024</p>
                </v-col>
                <v-col cols="12">
                  <v-chip>Concluída</v-chip>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
        <v-container v-else>
          <v-row>
            <v-col cols="12">
              <h3>Selecione uma tarefa para ver os detalhes.</h3>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col cols="8">
        
        <v-container>
            <v-row class="task-list-item" >
                <v-col>Nome da tarefa</v-col>
                <v-col>
                  <TaskActions @view="editTask" @edit="editTask" @delete="deleteTask" />
                </v-col>
            </v-row>
          
        </v-container>

      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import { defineProps } from "vue";
    const taskSelected = ref(true);
    const toast = useToast();

    const props = defineProps({
      title: { type: String, required: true },
      scope: { type: String, required: true, default: "all" },
      tab: { type: String, required: true },
    });

    const editTask = () => {
      toast.success("Editando tarefa");
    };

    const deleteTask = () => {
      toast.error("Tarefa deletada");
    };  

    const getUserTasks = async () => {
      try {
        const response = await useApi("task/6611e9299cd0a450907248e4", {
          method: "GET",
        });
        console.log(response);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

</script>

<style>
.task-list {
  display: flex;
  justify-content: center;
  height: 70vh;
  overflow: auto;
}

.task-details {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  margin-right: 15px;
  padding: 5px;
  background-color: #fdca9d;
  border: 1px solid #ccc;
  border-radius: 25px;
}

.task-list-item {
  display: flex;
  align-items: center;
  list-style-type: none;
  padding: 0px 15px;
  margin: 3px 0!important;
  background-color: #fdca9d;
  border: 1px solid #ccc;
  border-radius: 25px;
}

.task-list-item:hover {
  cursor: pointer;
}

.title {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #fdca9d;
  border: 1px solid #ccc;
  border-radius: 25px;
}

</style>

<template>
  <v-container v-if="!loading" >
    <v-row>
      <v-col cols="12" class="title">
        <h2>{{ title }}</h2>
      </v-col>
    </v-row>
    <v-row :class="isSmallScreen? 'task-list-sm': 'task-list-bg'">
      <v-col cols="12" lg="3" :class="isSmallScreen? 'task-details-sm': 'task-details-bg'">
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
      
      <v-col cols="12" sm="8">
        <v-container v-for="task in userTasks" :key="task.id">
            <v-row :class="isSmallScreen? 'task-list-item-sm': 'task-list-item-bg'" >
                <v-col>{{ task.title }}</v-col>
                <v-col>
                  <TaskActions @view="editTask" @edit="editTask" @delete="deleteTask" />
                </v-col>
            </v-row>
          
        </v-container>

      </v-col>
    </v-row>
  </v-container>
  <v-container v-else>
          <v-row>
            <v-col style="display: flex; justify-content: center;">
              <v-progress-circular indeterminate  model-value="20" :size="123" :width="12" color="red" />
            </v-col>
          </v-row>
        </v-container>
</template>

<script setup lang="ts">
  import { defineProps } from "vue";
import { useDisplay } from "vuetify";
    const taskSelected = ref(true);
    const toast = useToast();
    const display = useDisplay();
    const emit = defineEmits(["finishedLoading", "startLoading"]);
    const userTasks = ref<Task[]>([]);
    const loading = ref(false)

    interface Task {
      content: string;
      done: boolean;
      id: string;
      title: string;
      userId: string;
    }


    const props = defineProps({
      title: { type: String, required: true },
      scope: { type: String, required: true, default: "all" },
      tab: { type: String, required: true },
      userId: {type: String, required: true},
    });

    onBeforeMount(() => {
      getUserTasks();
    });

    const editTask = () => {
      toast.success("Editando tarefa");
    };

    const deleteTask = () => {
      toast.error("Tarefa deletada");
    };  

    const getUserTasks = async () => {
      loading.value= true
      try {
        const response = await useApi(`task/${props.userId}`, {
          method: "GET",
        });
        if (!response) throw new Error("Erro ao buscar dados");
        userTasks.value = response as Task[]

        loading.value=false
        
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        toast.error("Erro ao carregar tarefas do usuário");
        loading.value=false
      }
    };

    const isSmallScreen = computed(() => {
      return display.mobile.value || display.xs.value;
    });

</script>

<style>
.task-list-bg {
  display: flex;
  justify-content: center;
  height: 70vh;
  overflow: auto;
}

.task-list-sm {
  display: flex;
  flex-direction: column;
  width: 100%
}

.task-details-bg {
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
.task-details-sm {
  width: 100%;
  display: flex;
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

.task-list-item-bg {
  display: flex;
  align-items: center;
  list-style-type: none;
  padding: 0px 15px;
  margin: 3px 0!important;
  background-color: #fdca9d;
  border: 1px solid #ccc;
  border-radius: 25px;
}
.task-list-item-sm {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  list-style-type: none;
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

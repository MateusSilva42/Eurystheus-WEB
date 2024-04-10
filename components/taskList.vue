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
                  <h1>{{ currentTask?.title }}</h1>
                </v-col>
                <v-col cols="12">
                  <p style="font-size: 1.5rem;">{{ currentTask?.content }}</p>
                </v-col>
                <v-col cols="12">
                  <v-chip :color="currentStatusColor" size="large">{{ currentTaskStatus }}</v-chip>
                </v-col>
                <v-col cols="12" class="finish-btn">
                  <v-btn :color="currentTaskFinished ? '#bcb8d6' : 'success'" @click="modalFinishTask" :disabled="currentTaskFinished"> <v-icon>mdi-check</v-icon>Finalizar</v-btn>
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
            <v-row :class="isSmallScreen? 'task-list-item-sm': 'task-list-item-bg'" :style="task.done ? 'background-color: #8fe68f!important' : 'background-color: #bcb8d6'" >
                <v-col v-if="task.done"><s><h2>{{ task.title }}  </h2></s></v-col>
                <v-col v-else><h2>{{ task.title }}</h2></v-col>
                <v-col>
                  <TaskActions @view="getTaskDetails(task)" @edit="editTask(task)" @delete="modalConfirmDelete(task)" />
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
    <ModalConfirm :enable.sync="confirmDelete" message="Deseja realmente deletar essa tarefa? Não é possível desfazer essa ação." @confirm="deleteTask(currentTask)" @close="() => confirmDelete = false" />
    <ModalConfirm :enable.sync="confirmFinish" message="Deseja realmente finalizar essa tarefa? Não é possível desfazer essa ação." @confirm="finishTask" @close="() => confirmFinish = false" />
    <ModalAddView :enable.sync="modalEdit" :task="taskOnEdit" scope="edit" @close="() => modalEdit = false" />
   
</template>

<script setup lang="ts">

import { useDisplay } from "vuetify";
    const taskSelected = ref(false);
    const toast = useToast();
    const display = useDisplay();
    const emit = defineEmits(["finishedLoading", "startLoading"]);

    const userTasks = ref<Task[]>([]);

    const currentTask = ref<Task>() || undefined;
    const currentTaskStatus = ref('');
    const currentStatusColor = ref('');
    const currentTaskFinished = ref(false);
    const loading = ref(false);

    const confirmDelete = ref(false);
    const confirmFinish = ref(false);
    const modalEdit = ref(false);
    const taskOnEdit = {
      title: '',
      content: '',
      id: '',
    }

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

    const editTask = (task: Task) => {
      if(task.done) return toast.error("Tarefa concluída não pode ser editada");

      taskOnEdit.title = task.title;
      taskOnEdit.content = task.content;
      taskOnEdit.id = task.id;

      modalEdit.value = true;
    };

    const modalConfirmDelete = (task: Task) => {
      currentTask.value = task;
      
      if(!task) return;
      confirmDelete.value = true;
    };
    
    const deleteTask = (task: Task | undefined) => {
      try{
        if(!task) throw new Error("Erro ao deletar tarefa")  
        const response = useApi(`task/${task.id}`, {
          method: "DELETE",
        });
        if(!response) throw new Error("Erro ao deletar tarefa");

        toast.success("Tarefa deletada com sucesso");
        confirmDelete.value = false;
        setTimeout(() => {
        window.location.reload();
        }, 1500);

      }catch(error:unknown){
        console.error("Erro ao deletar tarefa", error);
        toast.error("Erro ao deletar tarefa");
      }
    };  
    
    const getTaskDetails = (task: Task) => {
      getTaskStatus(task.done)
      currentTask.value = task
      taskSelected.value = true;
      console.log('task atual', currentTask.value);

      if(isSmallScreen) window.scrollTo({top: 0, behavior: 'smooth'});
    }

    const getUserTasks = async () => {
      loading.value= true
      try {
        const response = await useApi(`task/${props.userId}`, {
          method: "GET",
        });
        if (!response) throw new Error("Erro ao buscar dados");
        const tasks = response as Task[];

        if(props.scope == 'all') {
          userTasks.value = tasks
        } else if (props.scope == 'pendent') {
          userTasks.value = tasks.filter(task => task.done === false)
        } else if (props.scope == 'done') {
          userTasks.value = tasks.filter(task => task.done === true)
        }

        loading.value=false
        
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        toast.error("Erro ao carregar tarefas do usuário");
        loading.value=false
      }
    };

    const getTaskStatus = (status: boolean) => {
      if(status){
        currentTaskStatus.value = 'Concluída'
        currentStatusColor.value = '#006400'
        currentTaskFinished.value = true
      } else {
        currentTaskStatus.value = 'Pendente'
        currentStatusColor.value = '#ff4500'
        currentTaskFinished.value = false
      }
    }

    const finishTask = () => {
      try{
          if(!currentTask.value) throw new Error("Erro ao finalizar tarefa");
          const data = {
            done: true
          }

          const response = useApi(`task/${currentTask.value?.id}`, {
            method: "PUT",
            data
          });
          if(!response) throw new Error("Erro ao finalizar tarefa");

          toast.success("Tarefa finalizada com sucesso");
          confirmFinish.value = false;

          setTimeout(() => {
          window.location.reload();
        }, 1500);

      }catch(error:unknown){
        console.error("Erro ao finalizar tarefa", error);
        toast.error("Erro ao finalizar tarefa");
      }

    }

    const modalFinishTask = () => {
        confirmFinish.value = true;
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
  background-color: #bcb8d6;
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
  background-color: #bcb8d6;
  border: 1px solid #ccc;
  border-radius: 25px;
}

.task-list-item-bg {
  display: flex;
  align-items: center;
  list-style-type: none;
  padding: 0px 15px;
  margin: 3px 0!important;
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
  background-color: #bcb8d6;
  border: 1px solid #ccc;
  border-radius: 25px;
}

.finish-btn {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

</style>

<template>
  <v-toolbar color="warning" flat dense :elevation="3" title="Eurystheus">
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props" @click="notify">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </template>
    </v-menu>
  </v-toolbar>

  <v-container>
    <v-card variant="outlined">
      <v-row>
        <v-col cols="12">
            <v-tabs v-model="tab" bg-color="warning" fixed-tabs :vertical="true" center-active show-arrows>
                <v-tab value="all">Todas as tarefas</v-tab>
                <v-tab value="done">Concluídas</v-tab>
                <v-tab value="pendent">Pendentes</v-tab>
            </v-tabs>
        </v-col>
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="all">
            <TaskList key="all" title="Todas as tarefas" scope="all" :tab="tab" />
          </v-window-item>

          <v-window-item value="done">
              <TaskList key="done" title="Tarefas concluídas" scope="done" :tab="tab" />
          </v-window-item>

          <v-window-item value="pendent">
              <TaskList key="pendent" title="Tarefas pendentes" scope="pendent" :tab="tab" />
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-row>
    </v-card>
  </v-container>

  <AddButon />

  <v-footer>Mateus Silva © - 2024</v-footer>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify';

    let tab = ref('');
    const display = useDisplay();

    const notify = () => {
      const toast = useToast();
      toast.success("Usuário deslogou com sucesso");
    };

    const handleLogout = (item: { action: string }) => {
      console.log("Usuário fez logout");
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

    const isSmallScreen = computed(() => {
      return display.mobile.value || display.xs.value;
    });

</script>

<style>
.v-slide-group__content {
  color: black;
}
</style>

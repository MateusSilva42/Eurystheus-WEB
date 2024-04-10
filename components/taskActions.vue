<template>
  <v-container class="task-actions">
    <v-tooltip text="Ver detalhes" location="top">
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props" @click="emit('view')" size="small">
          <v-icon color="blue">mdi-eye</v-icon>
        </v-btn>
      </template>
    </v-tooltip>

    <v-tooltip text="Editar tarefa" location="top">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon @click="emit('edit')" size="small">
          <v-icon color="orange">mdi-lead-pencil</v-icon>
        </v-btn>
      </template>
    </v-tooltip>

    <v-tooltip text="deletar tarefa" location="top">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon @click="emit('delete')" size="small">
          <v-icon color="red">mdi-trash-can</v-icon>
        </v-btn>
      </template>
    </v-tooltip>
  </v-container>
</template>

<script setup lang="ts">

const emit = defineEmits(["view", "edit", "delete"]);

</script>

<style>
.task-actions {
  display: flex;
  justify-content: flex-end;
  padding: 0!important;
  margin: 0!important;
}
</style>

<template>
    <v-container>
      <v-dialog max-width="500" v-model="enableValue" :persistent="true"  >
        <template v-slot:default="{ isActive }">
          <v-card class="card">
              <v-card-title class="card-title">
                  <span>Confirmar</span>    
              </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" class="message" >
                  {{ message }}
                </v-col>
                </v-row>
            </v-card-text>
  
            <v-card-actions>
              <v-spacer></v-spacer>
  
              <v-btn color="error" variant="flat" text="Cancelar" @click="$emit('close')"></v-btn>
              <v-btn color="success" variant="flat" text="Salvar" @click="$emit('confirm')" :loading="loading"></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-container>
  </template>
  
  <script setup lang="ts">
  
  const emit = defineEmits(["update:enable", "close", 'confirm']);
  const taskTitle = ref("");
  const taskDescription = ref("");
  const loading = ref(false);
  
  const props = defineProps({
    enable: { type: Boolean, required: true },
    message: { type: String, required: true},
  });
  
  const enableValue = computed({
    get: () => props.enable,
    set: (value) => emit("update:enable", value),
  })
  
  </script>
  
  <style>
  .card-title {
    display: flex;
    justify-content: space-between;
    background-color: orangered;
    color: white;
  }

    .message {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 1.6rem;
        padding: 35px;
    }
  
  </style>
  
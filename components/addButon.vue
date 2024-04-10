<template>
    <v-tooltip text="Criar tarefa">
    <template v-slot:activator="{ props }">
        <v-btn v-bind="props" class="add-button" @click="openModal" color="warning"><v-icon>mdi-plus</v-icon></v-btn>
    </template>
    </v-tooltip>
    
    <ModalAddView :enable="enable" :userId="userId" @close="closeModal" />
</template>

<script setup lang="ts">
const enable = ref(false);

const props = defineProps({
  userId: { type: String, required: true},
});

const openModal = () => {
  enable.value = true;
};
const closeModal = () => {
  enable.value = false;
};

</script>

<style>
    .add-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 999;
        width: 60px!important;
        height: 60px!important;   
        border-radius: 50%;
        font-size:1.5rem
    }
</style>

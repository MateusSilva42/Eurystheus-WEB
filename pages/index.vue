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
    <v-container fluid>
        <v-row no-gutters>
            <v-col cols="12">
                <s>teste</s>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">

export default defineComponent({
  setup() {
    const notify = () => {
        const toast = useToast()
            toast.success('Usuário deslogou com sucesso');
        }

    const handleLogout = (item: { action: string }) => {
        console.log('Usuário fez logout');
    };

    const getUserTasks = async () => {
    try {
        const response = await useApi('task/6611e9299cd0a450907248e4', { method: 'GET' });
        console.log(response);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
    };

    return {
      handleLogout,
      getUserTasks,
      notify
    };
  },
});
</script>

<style>
</style>

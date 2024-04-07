<template>
    <v-toolbar color="warning" flat dense :elevation="3" title="Eurystheus">
            <v-menu>
                <template v-slot:activator="{ props }">
                    <v-btn icon v-bind="props" @click="handleLogout">
                        <v-icon>mdi-logout</v-icon>
                    </v-btn>
                </template>
            </v-menu>
    </v-toolbar>
    <v-container fluid>
        <v-row no-gutters>
            <v-col cols="12">
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
export default defineComponent({
    setup() {
        const handleLogout = (item: { action: string }) => {
            console.log('Usuário fez logout');
        };

        return {
            handleLogout,
        };
    },
});
</script>

<style>
</style>
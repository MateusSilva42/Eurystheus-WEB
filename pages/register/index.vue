<template>
    <v-row class="login-container">
        <v-col class="login-bg" cols="8" v-if="!isSmallScreen">
        </v-col>
        <v-col class="login-form" cols="12" md="4" >
            <v-row class="login-form-container">
                <v-col class="flex-center app-name-container">
                    <span class="app-name">Eurystheus</span>
                </v-col>
                <v-col class="flex-center">
                    <v-img src="~/assets/logo.jpg" max-height="100" max-width="100"></v-img>
                </v-col>
                <v-col>
                    <v-card class="card-login">
                <v-card-title class="card-title login-title" >Cadastre-se</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-form v-model="valid">
                        <v-text-field label="Nome" :rules="nameRules" v-model="name" outlined required></v-text-field>
                        <v-text-field label="Nome de usuário" :rules="userNameRules" v-model="userName" outlined required></v-text-field>
                        <v-text-field label="Senha" :rules="passwordRules" v-model="password" outlined required></v-text-field>
                        <v-btn :loading="loading" color="primary" @click="register">Cadastrar</v-btn>
                    </v-form>
                    <p class="login-text">Já possui conta? faça <a href="/login"> login</a></p>
                </v-card-text>
            </v-card>
                </v-col>
            </v-row>

        </v-col>
        
    </v-row>

</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify';
import { useRouter } from 'vue-router';

const display = useDisplay();
const toast = useToast();
const router = useRouter();

const valid = ref(false);
const name = ref("");
const password = ref("");
const userName = ref("");
const loading = ref(false);

const nameRules = [
    (v: string) => !!v || 'Nome é obrigatório',
  ]

const userNameRules = [
    (v: string) => !!v || 'Nome de usuário é obrigatório',
  ]

const passwordRules = [
    (v: string) => v.length >= 6 || 'Senha é obrigatória e precisa ter pelo menos 6 caracteres',
  ]

const isSmallScreen = computed(() => {
return display.mobile.value || display.xs.value;
});

const register = async ()=> {
    loading.value = true;
    try{
        if(name.value == "" || password.value == "" || userName.value == ""){
            throw new Error("Preencha todos os campos");
        }

        const data = {
            name: name.value,
            password: password.value,
            username: userName.value
        }
        console.log('Dados enviados: ', data);

        const newUser = await useApi("user", {
        method: "POST",
        data,
        });
        if(!newUser){
            toast.success("Erro ao cadastrar novo usuário");
        }

        toast.success("Usuário cadastrado com sucesso.");
        setTimeout(() => {
            toast.success("Você será redirecionado para a página de login.");
        }, 1000);
        setTimeout(() => {
            loading.value = false;
            router.push("/login");
        }, 3000);

    }catch(error: unknown){
        if(error instanceof Error){
            toast.error(`Erro ao cadastrar novo usuário - ${error.message}`);
        } else {
            toast.error("Erro ao cadastrar novo usuário");
        }
        loading.value = false;
    }
}
</script>

<style scoped>

.login-container {
display: flex;
padding: 0!important;
margin: 0!important;
}

.login-form {
display: flex;
justify-content: center;
align-items: center;
background-color: #032e51;
padding: 20px;
border-radius: 5px;
}

.login-bg {
background-image: url('~/assets/login-img.jpg');
background-size: cover;
background-position: center;

border-radius: 5px;
}

.card-login {
width: 100%;
height: 400px;
}

.login-title{
text-align: center;
font-size: 1.5rem;
font-weight: bold;
}

.login-form-container {
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 20px;
}

.flex-center{
display: flex;
justify-content: center;
align-items: center;
}

.app-name {
font-size: 2rem;
font-weight: bold;
color: white;
}

.app-name-container {
margin-bottom: 20px;
}

.login-text {
    padding: 10px;
text-align: center;
}

</style>
<template>
        <v-row class="login-container">
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
                    <v-card-title class="card-title login-title" >Login</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-form>
                            <v-text-field label="Usuário" v-model="user" outlined></v-text-field>
                            <v-text-field label="Senha" v-model="password" outlined></v-text-field>
                            <v-btn color="primary" @click="login">Entrar</v-btn>
                        </v-form>
                        <p class="login-text">Não possui conta? se <a href="/register"> cadastre</a></p>
                    </v-card-text>
                </v-card>
                    </v-col>
                </v-row>
                

            </v-col>
            <v-col class="login-bg" cols="8" v-if="!isSmallScreen">
            </v-col>
        </v-row>

</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify';
import { useRouter } from 'vue-router';

const display = useDisplay();
const toast = useToast();
const router = useRouter();

const user = ref("");
const password = ref("");
const loading = ref(false);

const isSmallScreen = computed(() => {
    return display.mobile.value || display.xs.value;
});

const login = async () => {
    loading.value = true;
    try{
        const data = {
            user: user.value,
            password: password.value
        }

        const getCSRFToken = await useApi("auth/csrf-token", {
            method: "GET",
        }) as {csrfToken: string};
        if(!getCSRFToken){
            throw new Error("Erro realizar login.");
        }

        document.cookie = `csrf=${getCSRFToken.csrfToken}; path=/`;

        //armazenar no session storage
        const StringfiedCSRFToken = JSON.stringify(getCSRFToken.csrfToken);
        sessionStorage.setItem("csrf", StringfiedCSRFToken);

        console.log('CSRF Token: ', getCSRFToken.csrfToken);

        const login = await useApi("auth", {
        method: "POST",
        data,
        }) as {auth: string};
        if(!login){
            throw new Error("Erro realizar login.");
        }

        //armazenar no local storage
        const StringfiedLogin = JSON.stringify(login.auth);
        localStorage.setItem("token", StringfiedLogin);

        console.log('Dados recebidos do login: ', login);
        
        router.push("/");
        loading.value = false;


    }catch(error:unknown){
        toast.error("Erro ao fazer login");
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
    height: 300px;
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
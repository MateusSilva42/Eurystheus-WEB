<template>
</template>
  
  <script setup lang="ts">
  import { useRouter } from '#vue-router';
  import {jwtDecode} from "jwt-decode";
  
  interface CustonJwtPayload {
    username: string;
    userId: string;
    iat: number;
    exp: number;
  }
  
  const router = useRouter();
  
  const currentUser = ref({
    id: "",
    username: ""
  });
  
  onBeforeMount(() => {
    auth();
    getUserData();
  });
  
  const auth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login")
    } else {
        router.replace("/main")
    }
  };

  const getUserData = async () => {
    try{
      const token = localStorage.getItem("token");
      if(!token) return;
  
      const decoded = jwtDecode<CustonJwtPayload>(token);
  
      currentUser.value.id = decoded.userId;
      currentUser.value.username = decoded.username;
      
    }catch(error:unknown){
      console.log(error);
    }
  }
  
  </script>
  
  <style>
  </style>
  
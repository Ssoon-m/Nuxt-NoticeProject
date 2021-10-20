<template>
     <v-app-bar
      app
      color="blue-grey lighten-1"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>

      <div v-if="getLoginState" @click="logout">
        <NuxtLink to="/auth/login">
            <v-icon color="white">mdi-logout</v-icon>
        </NuxtLink>
      </div>
      <div v-else>
        <NuxtLink to="/auth/login">
            <v-icon>mdi-login</v-icon>
        </NuxtLink>
      </div>
    </v-app-bar>
</template>

<script>
export default {
    data(){
      return{
        loginState : false
      }
    },
    computed:{
      drawer:{
        get(){
          return this.$store.getters['nav/getDrawer']
        },
        set(v){
          this.$store.commit('nav/setDrawer', v)
        },
      },
      getLoginState(){
          return this.$store.getters['nav/getLoginAuth']
        }
    },
    methods:{
      logout(){
        let auth = localStorage.getItem('Auth');
        let loginauth = JSON.parse(auth);
        this.$store.commit('nav/setLoginAuth',!loginauth.loginstate);

        loginauth.loginstate = this.getLoginState;
        this.loginState = this.getLoginState;
        
        localStorage.setItem('Auth',JSON.stringify(loginauth));
      }
    }

}
</script>
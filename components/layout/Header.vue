<template>
     <v-app-bar
      app
      color="blue-grey lighten-1"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>

      <div>
        <NuxtLink to="/auth/login">
            <v-icon>mdi-login</v-icon>
        </NuxtLink>
      </div>
    </v-app-bar>
</template>

<script>
export default {

    computed:{
      drawer:{
        get(){
          return this.$store.getters['nav/getDrawer']
        },
        set(v){
          this.$store.commit('nav/setDrawer', v)
        }
      }
    }

}
</script>
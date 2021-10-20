<template>
  <v-navigation-drawer 
    v-model="drawer" 
    class="blue-grey darken-1"
    app 
  >

      <v-list-item>
        <v-list-item-content>
          <NuxtLink style="text-decoration:none" to="/">
              <v-list-item-title class="text-h6 white--text">
                CommunityProject
              </v-list-item-title>
          </NuxtLink>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list
        dense
        nav
      >

        <v-list-item v-if="getLoginState" @click="logout">
          <v-list-item-icon>
                <v-icon color="white">mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
              <v-list-item-title class="white--text">로그아웃</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-else
          v-for="item in Memberitems"
          :key="item.title"
          link
          :to="item.to"
          active-class="blue-grey darken-2"
          
        >
            <v-list-item-icon>
                <v-icon color="white">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
            </v-list-item-content>

        </v-list-item>

        <v-divider class="mb-10"></v-divider>

        <v-list-item
          v-for="item in Categoryitems"
          :key="item.title"
          link
          :to="item.to"
          active-class="blue-grey darken-2"
          class="py-1"
        >
            <v-list-item-icon>
                <v-icon color="white darken-2">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
  </v-navigation-drawer>

</template>
 

<script>

export default {
  data () {
    return {
      gradient: 'rgba(0,0,0,.7), rgba(0,0,0,.7)',
      Memberitems: [
        { title: '로그인', icon: 'mdi-login', to: '/auth/login' },
        { title: '회원가입', icon: 'mdi-account', to: '/auth/signUp' }
      ],
      Categoryitems: [
        { title: '커뮤니티', icon: 'mdi-chat', to: '/home' },
        { title: '게시판리스트', icon: 'mdi-image', to: '/' }
      ],
      loginState : false
    }
  },
  mounted(){
    let auth = localStorage.getItem('Auth'); 
    if(auth != null){
      let loginauth = JSON.parse(auth); 
      this.$store.commit('nav/setLoginAuth',loginauth.loginstate);
      this.loginState = this.getLoginState;
    }
  },
  computed:{
    drawer:{
      get(){
        return this.$store.getters['nav/getDrawer']
      },
      set(v){
        this.$store.commit('nav/setDrawer', v)
      }
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
      
      this.$router.push('/auth/login');
    }
  }
}
</script>
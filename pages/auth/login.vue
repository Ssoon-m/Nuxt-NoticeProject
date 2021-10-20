<template>
  <v-container class="fill-height" style="max-width:450px;">
    <v-row align="center">
      <v-col cols="12">
        <v-card
            class="mx-auto"
            max-width="400"
            min-width="400"
        >
          <v-img
          class="white--text align-end"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
          
            <v-card-title class="text-center">로그인</v-card-title>
          </v-img>
          <validation-observer v-slot="{ handleSubmit }">
              <v-form @submit.prevent="handleSubmit(onSubmit)" id="check-login-form">
                <v-card-text class="text--primary">
                  <validation-provider
                      v-slot="{ errors }"
                      name="email"
                      rules="required|email"
                      
                  >
                    <v-text-field
                        v-model="uid"
                        name="id"
                        prepend-icon="mdi-email"  
                        label="이메일"
                        :counter="10"
                        :error-messages="errors[0]"
                        :hide-details="errors[0] ? false : true"
                    />
                      
                  </validation-provider>
                  <validation-provider
                    v-slot="{errors}"
                    name="password"
                    rules="required|password"
                  >
                    <v-text-field
                        v-model="password"
                        type="password"
                        label="비밀번호"
                        prepend-icon="mdi-lock-outline"
                        :error-messages="errors[0]"
                        :hide-details="errors[0] ? false : true"
                    />
                  </validation-provider>
                </v-card-text>

                <v-card-actions>
                  <v-row justify="center">
                    <v-col 
                      cols="12"
                      sm="2">
                      <v-btn 
                        type="submit"
                        form="check-login-form"
                        color="blue white--text" 
                        width="100%" 
                        class="white--text">
                          로그인
                      </v-btn>
                    </v-col>
                    <v-col 
                      cols="12"
                      sm="2">
                      <v-btn @click="signUp" color="white" width="100%">
                        회원가입
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-actions>
              </v-form>
          </validation-observer>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      uid: null,
      password: null
    }
  },
  methods: {
    onSubmit () {
      let user = localStorage.getItem('Auth');
      let userInfo = JSON.parse(user);
      if(userInfo.email == this.uid && userInfo.password == this.password){
        userInfo.loginstate = true;
        localStorage.setItem('Auth',JSON.stringify(userInfo));
        this.$store.commit('nav/setLoginAuth',userInfo.loginstate);
        this.$router.push('/');
      }
    },
    signUp(){
      this.$router.push('/auth/signUp')
    }
  }
}
</script>

<template>
  <v-container class="fill-height" >
    <v-row justify="center">
      <v-col cols="auto">
        <v-card
            width="400"
        >
          <v-card-text class="text-center">
            <div class="purple--text pt-5 text-h5">계정 로그인</div>
          </v-card-text>
          <validation-observer v-slot="{ handleSubmit }">
              <v-form @submit.prevent="handleSubmit(onSubmit)" id="check-login-form">
                <v-card-text class=" px-4 pb-6 text--primary">

                  <validation-provider
                      v-slot="{ errors }"
                      name="email"
                      rules="required|email"
                  >
                    <v-card-subtitle class="pa-0">Email address</v-card-subtitle>
                    <v-text-field
                        v-model="uid"
                        name="id"
                        prepend-inner-icon="mdi-email"  
                        label="이메일"
                        color="purple"
                        solo
                        :counter="10"
                        :error-messages="errors[0]"
                    />
                      
                  </validation-provider>
                  <validation-provider
                    v-slot="{errors}"
                    name="password"
                    rules="required|password"
                  >
                    <v-card-subtitle class="pa-0">Password</v-card-subtitle>
                    <v-text-field
                        v-model="password"
                        type="password"
                        solo
                        color="purple"
                        label="비밀번호"
                        prepend-inner-icon="mdi-lock-outline"
                        :error-messages="errors[0]"
                    />
                  </validation-provider>

                  <v-row justify="center">
                    <v-col 
                      cols="12"
                      >
                      <v-btn 
                        type="submit"
                        form="check-login-form"
                        color="#60467e" 
                        height="45"
                        width="100%" 
                        class="white--text">
                          로그인
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-form>
          </validation-observer>
                   
          <div style="height:45px" class="d-flex justify-center align-center grey lighten-3">
            <div><span class="text-h7">회원이 아니세요?</span>&nbsp<NuxtLink style="color:violet" to="/auth/signUp">회원가입</NuxtLink></div>
          </div>
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

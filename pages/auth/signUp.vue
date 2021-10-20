<template>
  <v-container class="fill-height" style="max-width:450px;">
    <v-row align="center">
      <v-col cols="12">
        <v-card
            class="mx-auto"
            max-width="400"
            min-width="400"
        >
          <v-card-title>회원가입</v-card-title>
          <validation-observer v-slot="{ handleSubmit }">
            <v-form @submit.prevent="handleSubmit(onSubmit)" id="check-login-form">
              <v-card-text class="text--primary">
                <!-- hide-details ture false 적용가능 -->
                <validation-provider
                    v-slot="{ errors }"
                    name="email"
                    rules="required|email"
                >
                  <v-text-field
                      v-model="user.email"
                      label="이메일"
                      prepend-icon="mdi-email"
                      :error-messages="errors[0]"
                      :hide-details="errors[0] ? false : true"
                      class="my-2"
                  />
                </validation-provider>
                <validation-provider
                    v-slot="{ errors }"
                    name="password"
                    rules="required|password"
                >
                  <v-text-field
                      v-model="user.password"
                      label="비밀번호"
                      type="password"
                      prepend-icon="mdi-lock-outline"
                      class="my-2"
                      :error-messages="errors[0]"
                      :hide-details="errors[0] ? false : true"
                  />
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="이름"
                  rules="required|name|min:2"
                >
                  <v-text-field
                      v-model="user.name"
                      label="이름"
                      class="my-2"
                      prepend-icon="mdi-account"
                      :error-messages="errors[0]"
                      :hide-details="errors[0] ? false : true"
                  />
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="닉네임"
                  rules="required|nickName"
                >
                  <v-text-field
                      v-model="user.nickName"
                      label="닉네임"
                      class="my-2"
                      prepend-icon="mdi-face-man-outline"
                      :error-messages="errors[0]"
                      :hide-details="errors[0] ? false : true"
                  />
                </validation-provider>
              </v-card-text>

              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      type="submit"
                      form="check-login-form"
                      color="orange"
                      text
                  >
                      확인
                  </v-btn>
                  <v-btn
                      @click="returnLogin"
                      color="orange"
                      text
                  >
                      취소
                  </v-btn>
                  <v-spacer></v-spacer>
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
      password: null,
      user:{
        email:null,
        password:null,
        name:null,
        nickName:null,
      }
    }
  },
  methods: {
    onSubmit () {

      this.user.loginstate = "false";

      localStorage.setItem('Auth' , JSON.stringify(this.user));
      
      this.$router.push('/')
    },
    returnLogin(){
      this.$router.push('/auth/login')
    }
  }
}
</script>

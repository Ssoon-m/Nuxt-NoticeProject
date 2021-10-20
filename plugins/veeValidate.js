import Vue from 'vue'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import { messages } from 'vee-validate/dist/locale/ko.json'


Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule],
    message: messages[rule]
  })
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

extend('nickName', {
  validate: value => /^[A-Za-z가-힣]+$/.test(value),
  message: '{_field_}에는 한글과 영어만 사용할 수 있습니다'
})

extend('name', {
  validate: value => /^[가-힣]+$/.test(value),
  message: '{_field_}에는 한글만 사용할 수 있습니다.'
})

extend('password', {
  validate: value => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*+=-])[A-Za-z\d!@#$%^&*+=-]{8,}$/.test(value),
  message: '{_field_}에는 영문, 숫자, 특수문자를 조합한 8자 이상을 입력해주세요'
})

extend('youtubeUrl', {
  validate: value => /(http:|https:)?(\/\/)?(www\.)?(youtube.com|youyu.be)\/(watch|embed)?(\?v=|\/)?(\s+)?/.test(value),
  message: '{_field_}에는 유효한 유튜브 URL주소를 입력해주세요'
})


<template>
  <v-container class="mt-10" style="max-width:1000px;">
    <p class="text-h5">새 글 쓰기</p>
    <v-card>
      <UserProfile>
          <template v-slot:user>
              <span>{{nickName}}</span>
          </template>
      </UserProfile>
      <v-divider></v-divider>
      <v-container class="px-10">

        <validation-observer v-slot="{ handleSubmit }">
        <v-form @submit.prevent="handleSubmit(onSubmit)" id="write-form">
          <v-card-text>
            <!-- id가 이미 입력된상태로 disabled -->
            <v-text-field
              @keypress.enter.prevent
              label="아이디"
              class=" pa-0 my-2"
              solo
              disabled
              hide-details
              v-model="email"
            />

            <v-text-field
              @keypress.enter.prevent
              v-model="boardInfo.title"
              label="제목을 입력해 주세요"
              solo
              autofocus
              class="pa-0 my-2"
              hide-details
            >{{boardDetail.title}}</v-text-field>

            <v-row>
              <v-col 
                cols="12"
                sm="6">
                <v-select
                  @keypress.enter.prevent
                  v-model="boardInfo.uploadstyle"
                  :items="uploaditems"
                  item-text="name"
                  disabled
                  item-value="value"
                  dense
                  :rules="upload_rule"
                  label="글쓰기 형식 선택"
                  solo
                ></v-select>
              </v-col>
            </v-row>
            
            <template v-if="boardInfo.uploadstyle === 'pictureAndContents'">
              <v-file-input 
                multiple 
                label="File input" 
                outlined
                accept="image/*"
                dense
                transition="scale-transition"
                v-model="selectFile"
                @change="onFileSelected"
                >
              </v-file-input>
            </template>

            <template v-if="boardInfo.uploadstyle === 'video'">
            
              <validation-provider
                  v-slot="{ errors }"
                  name="youtubeURL"
                  rules="youtubeUrl"
              >
              
              <div>
                <v-text-field
                  solo
                  dense
                  dark
                  :hide-details="errors[0] ? false : true"
                  ref="urlerror"
                  :error-messages="errors[0]"
                  placeholder="유튜브 url 삽입"
                  background-color="indigo lighten-2"
                  prepend-inner-icon="mdi-file-video-outline"
                  @input="urlError(errors[0])"
                  @keydown.ctrl.v="urlError(errors[0])"
                  @keydown.meta.v="urlError(errors[0])"
                  v-model="uploadVideoUrl"
                  ></v-text-field> 

                  <v-btn @click="youtubePreview" class="pt-0" text color="purple">영상 미리보기</v-btn>
              </div>

                </validation-provider>
            
              <template v-if="preview">
                <div class="grey video">
                  <div class="video-container">
                    <iframe width="500px" height="250px" :src="embedYoutubeUrl" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  </div>
                </div>
              </template>
            </template>

            <template v-if="boardInfo.uploadstyle === 'pictureAndContents'">
              <div v-if="uploadFileList.length > 0">
                <v-card class="d-flex elevation-0">
       
                  <template>
                    <v-carousel
                      cycle
                      height="200"
                      hide-delimiter-background
                      show-arrows-on-hover
                    >
                      <v-carousel-item
                        v-for="(item, i) in uploadFileList"
                        :key="i"
                      >
                          <v-row
                            class="fill-height"
                            align="center"
                            justify="center"
                          >
                            <v-img
                              :src="item.url"
                              height="100%"
                              max-width="200">
                            </v-img>
                          </v-row>
                      </v-carousel-item>
                    </v-carousel>
                  </template>
                </v-card>
              </div>

              <v-textarea
                height="300"
                v-model="boardInfo.contents"
                label="글을 입력"
                hide-details
                solo
              >
              </v-textarea>
            </template>

          <v-card-actions class="mt-10">
            <v-row justify="end">
              <v-col 
                cols="12"
                sm="2">
                <v-btn 
                  type="submit"
                  form="write-form"
                  color="green" 
                  width="100%" 
                  class="white--text">등록
                </v-btn>
              </v-col>
              <v-col 
                cols="12"
                sm="2">
                <v-btn @click="moveMain" color="white" width="100%">취소</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
         </v-card-text>
        </v-form>
        </validation-observer>

      </v-container>
    </v-card>
  </v-container>
</template>
<script>
import UserProfile from '@/components/page/board/common/UserProfile.vue'

export default {
  components:{ UserProfile },
  data: () => ({
    boardInfo : {
      index : 0,
      comment : 0,
      goodOrBad : 0,
      hit : 0,
      title : "",
      contents : "",
      uploadstyle : "",
      year : "",
      time : ""
    },
    selectFile : [],
    uploadFileList : [],
    nickName : '',
    email : '',
    preview : false,
    uploaditems: [
      { name : '영상' , value : 'video'},
      { name : '사진,내용' , value : 'pictureAndContents'}
    ],
   
    uploadVideoUrl : "",

    videoUrlError : true,

    boardDetail : {}, // mounted 로 가져올 상세 글
    paramId : '', // key값

     upload_rule : [
      v => !!v || '필수 선택 사항입니다.'
    ],
  }),

  middleware: 'authenticated',

  mounted(){
      let user = localStorage.getItem('Auth');
      let userInfo = JSON.parse(user);
      this.nickName = userInfo.nickName;
      this.email = userInfo.email;

      let boardStorage = localStorage.getItem('BoardList');
        this.paramId = this.$route.params.id;
        if(boardStorage != null){
            let JboardStorage = JSON.parse(boardStorage);
            JboardStorage.forEach((boardList,key) => { // 1이 나와야 하는데 9가 나옴....
                if(boardList.index == this.paramId){
                    this.boardDetail = JboardStorage[key];
                    this.boardInfo.title = this.boardDetail.title;
                    this.boardInfo.uploadstyle = this.boardDetail.uploadstyle;
                    if(this.boardDetail.uploadImage) this.uploadFileList = this.boardDetail.uploadImage;
                    this.boardInfo.contents = this.boardDetail.contents;
                    this.paramId = key;
                } 
            })
        }        
  },
  computed:{
    getIndex(){
      return this.$store.getters['store/getIndex']
    },
    getYear(){
      let today = new Date();
      let year = today.getFullYear();
      let month = today.getMonth() + 1;
      let date = today.getDate();
      let boardyear = year + "-" + month + "-" + date;
      return boardyear
    },
    getTime(){
      let today = new Date();
      let hours = today.getHours();
      if(hours === 0) hours = "00";
      let minutes = today.getMinutes();
      if(minutes < 10) minutes = "0" + minutes;
      let seconds = today.getSeconds();
      if(seconds < 10) seconds = "0" + seconds;
      let boardtime = hours + ":" + minutes + ":" + seconds;
      return boardtime
    },
    embedYoutubeUrl(){
      return this.uploadVideoUrl.replace('watch?v=','embed/')
    }
  },
  watch : {
      /*
      'boardInfo.uploadstyle'(){
        this.uploadVideoUrl = "";
        this.uploadFileList = [];
    }*/
  },
  methods: {
    setIndex(){
      this.$store.commit('store/setIndex')
    },
    onSubmit () {

      let boardStorage = [];

      this.boardInfo.index = this.$route.params.id; // 수정이기 때문에 인덱스 증가시키지 않는다.
      this.boardInfo.year = this.getYear;
      this.boardInfo.time = this.getTime;
      this.boardInfo.youtubeUrl = this.embedYoutubeUrl;
      this.boardInfo.uploadImage = this.uploadFileList;
      
      let boardInfo = this.boardInfo; 
      let boardList = localStorage.getItem('BoardList'); 
      
      let JboardList = JSON.parse(boardList); // [{a : 1},{1 : 2}]

      JboardList[this.paramId] = boardInfo;

      localStorage.setItem('BoardList' , JSON.stringify(JboardList));
      
      this.$router.push('/')
    },
    onFileSelected(event){
      // 파일 다시 골랐을때 리스트 다 비우기
      this.uploadFileList = [];

      this.selectFile.forEach((value,key)=>{
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
          let img = {
            url : e.target.result,
            //name : value.name,
            //size : value.size
          };
          this.uploadFileList.push(img);
        }
        fileReader.readAsDataURL(value);
      })
    },
    youtubePreview(){
      this.videoUrlError ? this.preview = false : this.preview = true
    },
    urlError(error){
      error ? this.videoUrlError = true : this.videoUrlError = false;
    },
    moveMain(){
      this.$router.push("/");
    }
  }
}
</script>

<style lang="scss" scoped>
  .video {
    width: 100%;
    max-width: 900px;
    margin: 30px auto;
    border-radius: 30px;
    background-color: #f0f0f0;
    padding: 40px;
    box-sizing: border-box;
    box-shadow: 0px 8px 33px #999;
  }
  .video-container {
    position: relative;
    width: 100%;
    height: auto;
    padding-top: 50%;
  }
  iframe {
    z-index: 1;
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
  }

 
</style>
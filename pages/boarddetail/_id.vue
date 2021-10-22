<template>
    <v-container class="mt-10">

        <v-row justify="end" class="mb-2">
            <v-col cols="auto" >
                <WriteButton>
                    <template v-slot:text>
                        새 글 쓰기
                    </template>    
                </WriteButton>
            </v-col>
        </v-row>
        <v-card >
            <v-row dense>
                <v-col>
                    <UserProfile>
                        <template v-slot:user>
                            <span>samchon</span>
                        </template>
                        <template v-slot:day>
                            <div class="pr-1 divide">{{boardDetail.year}}</div>
                        </template>    
                        <template v-slot:time>
                            <div class="pl-1">{{boardDetail.time}}</div>
                        </template>
                    </UserProfile>
                </v-col>
                <v-col style="position:relative;" >
                    <div 
                        class="pa-4"
                        style="position:absolute;
                                top:0;
                                right:0;">
                        <v-icon small color="black">mdi-comment</v-icon>
                        <span class="text-body-2">{{boardDetail.comment}}</span>
                        <v-icon small color="black">mdi-eye</v-icon>
                        <span class="text-body-2">{{boardDetail.hit}}</span>
                    </div>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-card-subtitle class="pb-0">#{{boardDetail.index}}</v-card-subtitle>
            <v-card-title class="pt-0">{{boardDetail.title}}</v-card-title>
            <v-divider />

            <div class="d-sm-flex">
                <div style="width:96%" v-if="boardDetail.uploadstyle === 'pictureAndContents'" class="pa-4">
                    <template>
                    <v-carousel
                      cycle
                      height="200"
                      hide-delimiter-background
                      show-arrows-on-hover
                    >
                      <v-carousel-item
                        v-for="(item, i) in boardDetail.uploadImage"
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
                  
                  <p v-html="content"></p>

                </div>

                <div v-if="boardDetail.uploadstyle === 'video'" class="grey video">
                    <div class="video-container">
                    <iframe width="500px" height="250px" :src="boardDetail.youtubeUrl" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>

                <v-divider vertical></v-divider>

                <div v-if="$vuetify.breakpoint.smAndUp">
                    <div 
                        style="width:70px;
                                height:110px;
                                position:sticky;
                                top:56px"

                        class=" mt-5 d-flex flex-column align-center">
                        <v-btn
                        @click="GoodOrBad(1)"
                        icon>
                            <v-icon>mdi-arrow-up</v-icon>
                        </v-btn>
                        <div class=" text-h4 grey--text">
                            {{boardDetail.goodOrBad}}
                        </div>
                        <v-btn
                            @click="GoodOrBad(-1)"
                            icon>
                            <v-icon>mdi-arrow-down</v-icon>
                        </v-btn>
                    </div>
                </div>
                

                <div v-else class="d-flex-none">
                    <v-divider></v-divider>
                    <div
                        class="pl-3">
                        <v-btn
                        icon
                        @click="GoodOrBad(1)"
                        small>
                            <v-icon small>mdi-arrow-up</v-icon>
                        </v-btn>
                        <div class="pl-2 text-h6 grey--text">
                            {{boardDetail.goodOrBad}}
                        </div>
                        <v-btn
                            icon
                            @click="GoodOrBad(-1)"
                            small>
                            <v-icon small>mdi-arrow-down</v-icon>
                        </v-btn>
                    </div>
                </div>
            </div>
            
        </v-card>
        
        <div class="my-10" style="height:1px">
        </div>

        <v-card class="mt-10">
            <div class="pa-4 grey lighten-3">댓글 <span>12</span></div>
            <div v-for="value in 6"
                :key="value">
                <UserProfile />
                <v-card-text class="font-weight-medium black--text">
                    멋지네요
                </v-card-text>    
                <v-divider />
            </div>
            
        </v-card>
    </v-container>
</template>

<script>
import UserProfile from '@/components/page/board/common/UserProfile'
import WriteButton from '@/components/page/board/common/WriteButton'

export default{
    components:{
        UserProfile,
        WriteButton
    },
    data(){
        return{
            boardDetail : {},
            paramId : '',
        }
    },
    mounted(){
        let boardStorage = localStorage.getItem('BoardList');
        this.paramId = this.$route.params.id;
        if(boardStorage != null){
         //   console.log("mounted : " + boardStorage); // title , contents , uploadstyle
            let JboardStorage = JSON.parse(boardStorage);
            JboardStorage.forEach((boardList,key) => {
                if(boardList.index == this.paramId){
                    this.boardDetail = JboardStorage[key];
//                    console.log("keykeykeykeyk : " + key)
//                    console.log(this.boardDetail);
                    this.paramId = key;
                    this.boardDetail.hit++;
                    this.Hit();
            
                } 
            })

            
        }

        //this.boardInfo.youtubeUrl = this.embedYoutubeUrl;
        //this.boardInfo.uploadImage = this.uploadFileList;

    },
    computed:{
        content(){
            return this.boardDetail.contents.split('\n').join('<br>');
            //return this.content.replace(/(?:\r\n|\r|\n)/g, '<br>'); 정규식
        }
    },
    methods : {
        Hit(){
            
            let boardList = localStorage.getItem('BoardList'); 
            
            let JboardList = JSON.parse(boardList); // [{a : 1},{1 : 2}]
            JboardList[this.paramId].hit = parseInt(this.boardDetail.hit);
            
            localStorage.setItem('BoardList' , JSON.stringify(JboardList));
        },
        GoodOrBad(PlusMinus){
            let boardList = localStorage.getItem('BoardList'); 
            
            let JboardList = JSON.parse(boardList); // [{a : 1},{1 : 2}]
            this.boardDetail.goodOrBad = parseInt(this.boardDetail.goodOrBad) + PlusMinus;
            JboardList[this.paramId].goodOrBad = this.boardDetail.goodOrBad;
            JboardList[this.paramId].hit = parseInt(this.boardDetail.hit);
            
            localStorage.setItem('BoardList' , JSON.stringify(JboardList));
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
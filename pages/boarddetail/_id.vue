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
                <div v-if="boardDetail.uploadstyle === 'pictureAndContents'" class="pa-4">
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

                  
                    <v-card-text>
                    https://github.com/samchon/backend 
                    현재 제가 재직 중인 회사 "아키드로우" 에는, 신입 백엔드 개발자들이 많습니다. samchon/backend 는 이들 신입 백엔드 개발자들을 보다 체계적으로 교육하기 위하여 특별히 만든, 일종의 예제 프로젝트입니다.
                    이 예제 프로젝트는, 요구사항을 분석하여 DB 아키텍처와 API 인터페이스를 설계하고 테스트 자동화 프로그램을 작성한 후 메인 서버 프로그램을 작성하는 등, 일련의 백엔드 설계 및 개발 과정을 모범적으로 보여주기 위하여 제작하였습니다. 동시에 무중단 업데이트나 스케쥴러 구성을 어떻게 하는 지 등, 백엔드의 인프라를 구축함에 있어 특정 벤더에 영향받지 않으며 로컬에서도 재현 가능한, 중립적인 백엔드 환경 구성 등을 다루고 있습니다.
                    더하여 이 신입 백엔드 개발자들에게 교육을 해 줌에 있어, 본인이 그간 백엔드를 개발하며 느껴왔던 여러 불편하고 비효율적인 점들을 굳이 되물림하지 않았으면 좋겠다는 생각을 하였습니다. 이에 교육 자료를 만듦에 있어, nesita 나 safe-typeorm 등도 함께 개발하게 되었습니다.
                    - https://github.com/samchon/nestia 

                        - NestJS 로 만들어진 백엔드 서버의 소스 코드를 분석

                        - API 연동 라이브러리를 자동으로 만들어 줌

                        - Swagger 문서를 작성하고 해독하는 일 따위가 불필요

                    - https://github.com/samchon/safe-typeorm 

                        - TypeORM 를 컴파일 수준에서 강화해주는 헬퍼 라이브러리

                        - SQL 자동 완성 및 컴파일 타임 검증 가능

                        - 출력코자 하는 JSON 구조만 적어줘도

                        - SQL 쿼리와 앱 조인 및 퍼포먼스 튜닝을 자동으로 해 줌
                    </v-card-text>
                </div>

                <div v-if="boardDetail.uploadstyle === 'video'" class="grey video">
                    <div class="video-container">
                    <iframe width="500px" height="250px" :src="boardDetail.youtubeUrl" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>

                <v-divider vertical></v-divider>
                <div 
                    v-if="$vuetify.breakpoint.smAndUp" 
                    class="d-flex flex-column justify-center align-center">
                 
                        <v-btn
                        @click="GoodOrBad(1)"
                        icon>
                            <v-icon>mdi-arrow-up</v-icon>
                        </v-btn>
                        <div class="pl-2 text-h4 grey--text">
                            {{boardDetail.goodOrBad}}
                        </div>
                        <v-btn
                            @click="GoodOrBad(-1)"
                            icon>
                            <v-icon>mdi-arrow-down</v-icon>
                        </v-btn>
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
            <div v-for="value in 4"
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
            console.log("mounted : " + boardStorage); // title , contents , uploadstyle
            let JboardStorage = JSON.parse(boardStorage);
            JboardStorage.forEach((boardList,key) => {
                if(boardList.index == this.paramId){
                    console.log("if들어옴")
                    this.boardDetail = JboardStorage[key];
                    console.log("keykeykeykeyk : " + key)
                    console.log(this.boardDetail);
                    this.paramId = key;
                    this.boardDetail.hit++;
                    this.Hit();
            
                } 
            })

            
        }

        //this.boardInfo.youtubeUrl = this.embedYoutubeUrl;
        //this.boardInfo.uploadImage = this.uploadFileList;

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
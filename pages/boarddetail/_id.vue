<template>
    <v-container class="mt-10" style="max-width:1000px; min-width:380px;">

        <v-row justify="end" class="mb-2">
            <v-col cols="auto" >
                <WriteButton>
                    <template v-slot:text>
                        새 글 쓰기
                    </template>    
                </WriteButton>
            </v-col>
        </v-row>

        <v-card>
            <v-row dense >
                <v-col 
                    cols="7">
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
                <v-col cols="5" style="position:relative;" >
                    <div 
                        class="pa-4"
                        style="position:absolute;
                                top:0;
                                right:0;">
                        <v-icon small color="black">mdi-comment</v-icon>
                        <span class="text-body-2">{{Listcomments.length}}</span>
                        <v-icon small color="black">mdi-eye</v-icon>
                        <span class="text-body-2">{{boardDetail.hit}}</span>
                    </div>
                </v-col>
            </v-row>
            <v-divider></v-divider>

            <div class=" d-flex justify-space-between align-center">
                <v-card-subtitle>#{{boardDetail.index}}</v-card-subtitle>
                <div></div>
                <div class="align-self-center">
                    <v-menu offset-y >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            icon
                            color="primary"
                            dark
                            v-bind="attrs"
                            v-on="on"
                            >
                            <v-icon>mdi-cog-outline</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item class="pointer">
                              <v-list-item-title @click='boardModify(`${$route.params.id}`)'>
                                    <v-icon>mdi-pencil-box-outline</v-icon>수정
                              </v-list-item-title>
                            </v-list-item>
                            <v-list-item class="pointer">
                              <v-list-item-title @click='boardDelete'>
                                    <v-icon>mdi-trash-can-outline</v-icon>삭제
                              </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </div>
            <v-card-title class="pt-0">{{boardDetail.title}}</v-card-title>
            <v-divider />
            
            
            <div class="d-sm-flex">
                <div style="width:96%" v-if="boardDetail.uploadstyle === 'pictureAndContents'" class="pa-4">
                    <template v-if="boardDetail.uploadImage.length != 0">
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
                  
                  <p v-html="content" />

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
                                top:56px
                                "

                        class="mt-2 d-flex flex-column align-center">
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
        
        <div class="my-10" style="height:1px"></div>

        <v-card class="mt-10">
            <div class="pa-4 grey lighten-3">댓글 
                <span v-if="Listcomments" class="black--text">{{Listcomments.length}}</span>
                <span v-else class="black--text">0</span>
            </div>
            <div v-for="(comment,key) in Listcomments"
                :key="key">
                <UserProfile />
                <v-card-text class="font-weight-medium black--text">
                    {{comment}}
                </v-card-text>    
                <v-divider />
            </div>
        </v-card>

        <v-card class="mt-10">
            <v-row no-gutters>
                <v-col cols="auto" align-self="center" class=" ml-2">
                    <v-icon color="blue lighten-1" >mdi-pencil-box-outline</v-icon>                    
                </v-col>
                <v-col cols="auto">
                    <UserProfile />
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row dense>
                <v-col cols="12"
                       md="11">
                    <v-textarea
                        height="250"
                        hide-details
                        label="댓글"
                        solo
                        v-model="comment"
                    />
                </v-col>
                <v-divider 
                    style="height:252px;
                           transform:translate(0,5px);" 
                    v-if="$vuetify.breakpoint.mdAndUp" 
                    vertical>
                </v-divider>
                <v-col cols="12" 
                       md="1"
                       align-self="end" 
                       class="mb-3">
                    <v-btn @click="writeComment" color="green lighten-1" class="white--text">등록</v-btn>
                </v-col>
            </v-row>
        </v-card>
        <div class="my-10" style="height:1px"></div>
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
            comment : '', // 글 작성
            Listcomments : [],

           
        }
    },
    mounted(){
        // userId 가져오기

        let boardStorage = localStorage.getItem('BoardList');
        this.paramId = this.$route.params.id;
        if(boardStorage != null){
         //   console.log("mounted : " + boardStorage); // title , contents , uploadstyle
            let JboardStorage = JSON.parse(boardStorage);
            JboardStorage.forEach((boardList,key) => { // 1이 나와야 하는데 9가 나옴....
                if(boardList.index == this.paramId){
                    this.boardDetail = JboardStorage[key];
                    this.paramId = key;
                    this.boardDetail.hit++;
                    this.Listcomments = JboardStorage[key].comment;
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
            
            localStorage.setItem('BoardList' , JSON.stringify(JboardList));
        },
        writeComment(){
            if(this.comment){
                console.log("this.paramId : " + this.paramId);
                let boardList = localStorage.getItem('BoardList');
                let JboardList = JSON.parse(boardList);
                let countComment = JboardList[this.paramId].comment.length;
                if(countComment === undefined){
                    console.log("if문 들어왔습니다.");
                    let comments = [];
                    comments.push(this.comment)
                    JboardList[this.paramId].comment = comments;                    
                    this.Listcomments = comments;
                }else{
                    JboardList[this.paramId].comment.push(this.comment);
                    this.Listcomments = JboardList[this.paramId].comment;
                }
                this.comment = '';
                localStorage.setItem('BoardList',JSON.stringify(JboardList));
            }
        },
        boardModify(index){
            this.$router.push(`/modify/${index}`);
        },
        boardDelete(){
            let boardStorage = localStorage.getItem('BoardList');
            let JboardStorage = JSON.parse(boardStorage);
            // this.paramId 인덱스에서 요소 한개 제거
            JboardStorage.splice(this.paramId,1); 
            localStorage.setItem('BoardList' , JSON.stringify(JboardStorage));
            this.$router.push('/')
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
  .pointer:hover {
    background-color:rgb(243, 239, 239);
    opacity: 0.5;
    cursor: pointer;
  }
</style>
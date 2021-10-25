<template>
  <v-container>
    <BoardBanner />

    <v-row justify="end" class="my-3">
      <v-col cols="auto" >
          <WriteButton>
              <template v-slot:text>
                  새 글 쓰기
              </template>    
          </WriteButton>
      </v-col>
    </v-row>



    <v-card class="elevation-0 grey lighten-2" v-if="boardList.length === 0">
      <p class="pa-10 text-center text-h4 text-bold">작성된 글이 없습니다.</p>
    </v-card>

    <v-card>
      <v-simple-table >
        <template v-slot:default>
          <tbody>
              <tr
                class="tr-pointer"
                v-for="item in boardListPaging"
                :key="item.index"
                @click="boardDetail(`${item.index}`)"
              >
                <td>
                    <v-card-subtitle class="grey--text pa-0"><span class="boardNo">#{{item.index}}</span></v-card-subtitle>
                    <span class="blue--text font-weight-bold">{{ item.title }}</span>
                </td>
                
                <td class="d-flex pa-0">
                  <v-spacer></v-spacer>
                  <div class="pa-4 d-none d-sm-flex align-center">
                      <v-icon small color="black">mdi-comment</v-icon>
                      <span class="mr-2 text-body-2">12</span>
                      <template v-if="item.goodOrBad < 0">
                          <v-icon small color="black">mdi-thumb-down</v-icon>
                          <span class="mr-2 text-body-2">{{item.goodOrBad}}</span>
                      </template>
                      <template v-if="item.goodOrBad > 0">
                          <v-icon small color="black">mdi-thumb-up</v-icon>
                          <span class="mr-2 text-body-2">{{item.goodOrBad}}</span>
                      </template>
                      <template v-if="item.goodOrBad === 0">
                          <v-icon small color="black">mdi-thumb-up-outline</v-icon>
                          <span class="mr-2 text-body-2">{{item.goodOrBad}}</span>
                      </template>
                      
                      <v-icon small color="black">mdi-eye</v-icon>
                      <span class="text-body-2">{{item.hit}}</span>
                  </div>
                  <UserProfile>
                      <template v-slot:user>
                          <span>{{nickName}}</span>
                      </template>
                      <template v-slot:day>
                          <div class="pr-1 divide">{{item.year}}</div>
                      </template>    
                      <template v-slot:time>
                          <div class="pl-1">{{item.time}}</div>
                      </template>
                  </UserProfile>
                </td>
              </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>

    <div class="mt-6 text-center">
      <v-pagination
        v-model="page"
        :length="pagination"
        :total-visible="7"
      ></v-pagination>
    </div> 
  </v-container>
</template>


<script>
import UserProfile from './common/UserProfile'
import WriteButton from './common/WriteButton'
import BoardBanner from '@/components/page/BoardBanner'

  export default {
    components:{
      UserProfile,
      BoardBanner,
      WriteButton
    },
    props: {
      pageNo : {
        type : Number,
        default : 1
      }
    },
    data () {
      return {
        boardList : [],
        boardListPaging : [],
        nickName : '',
        pagination : 0,
        page : 1,
        show : 10
      }
    },
    mounted(){
      let boardStorage = localStorage.getItem('BoardList');
      if(boardStorage != null){
        let JboardStorage = JSON.parse(boardStorage).reverse();
        this.boardList = [...JboardStorage];

          // noticelist/page    
          // page = 1
      
          //let page = this.$route.params.page;

          let show = this.show;

          let start_page = ((1 - 1) * show) + 1; 
          let end_page = 1 * show;               

          this.boardListPaging = this.boardList.slice(start_page-1,end_page); 

          const pageNav = 5;

          let total_page = this.boardList.length;
          this.pagination = Math.ceil(total_page/show); 

      }
      let user = localStorage.getItem('Auth');
      let userInfo = JSON.parse(user);
      this.nickName = userInfo.nickName;

    },
    watch : {
      page(page){
          let show = this.show;
          let start_page = ((page - 1) * show) + 1; 
          let end_page = page * show;               

          this.boardListPaging = this.boardList.slice(start_page-1,end_page); 
      }
    },
    methods : {
      boardDetail(index){
        this.$router.push(`/boarddetail/${index}`);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tr-pointer:hover{
    cursor: pointer;
  }
</style>
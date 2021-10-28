<template>
    <v-container>
        <Banner />
        <v-row class="mt-sm-10" dense>
            <v-col
                cols="12"
                sm="auto"
            >
                <span class="font-weight-black">1게시판</span>
                <v-card
                >
                    <div 
                        v-for="count in 4" 
                        :key="count"
                    >
                        <v-card-text 
                            class="text--primary">
                            도전을 망설이고 있는 비전공자들에게
                        </v-card-text>
                        <div class="d-flex justify-end mr-3">
                            <div class="pr-3">
                                <v-icon>mdi-account-box</v-icon>
                                <span class="text-subtitle-2">공돌돌이</span>
                            </div>
                            <div class="pr-3"> 
                                <v-icon>mdi-heart</v-icon>
                                <span class="text-subtitle-2">200</span>
                            </div>
                            <div> 
                                <span class="text-subtitle-2">3일전</span>
                            </div>
                        </div>
                 
                        <v-divider></v-divider>
                    </div>
                </v-card>
            </v-col>
            <v-col
                cols="12"
                sm="auto"
            >
                <span class="font-weight-black">2게시판</span>
                <v-card
                >
                     <div 
                        v-for="count in 4" 
                        :key="count"
                    >
                        <v-card-text 
                            class="text--primary">
                            도전을 망설이고 있는 비전공자들에게
                            도전을 망설이고 있는 비전공자들에게
                            도전을 망설이고 있는 비전공자들에게
                        </v-card-text>
                        <div class="d-flex justify-end mr-3">
                            <div class="pr-3">
                                <v-icon>mdi-account-box</v-icon>
                                <span class="text-subtitle-2">공돌돌이</span>
                            </div>
                            <div class="pr-3"> 
                                <v-icon>mdi-heart</v-icon>
                                <span class="text-subtitle-2">200</span>
                            </div>
                            <div> 
                                <span class="text-subtitle-2">3일전</span>
                            </div>
                        </div>
                        
                        <v-divider></v-divider>
                    </div>
                </v-card>
            </v-col>
                <v-spacer></v-spacer>
        </v-row>
        <v-row
            class="mt-sm-12" 
            dense 
            justify="start">
            <span class="font-weight-black">3게시판</span>
            <v-col cols="12">
                <v-card>
                   <div 
                        v-for="count in 4" 
                        :key="count"
                    >
                        <v-card-text 
                            class="text--primary">
                            [일반스터디] 고양,파주 지역중심 웹 게임,어플 제작 같이 하실 분 모집합니다 사진
                        </v-card-text>
                         <div class="d-flex justify-end mr-3">
                            <div class="pr-3">
                                <v-icon>mdi-account-box</v-icon>
                                <span class="text-subtitle-2">공돌돌이</span>
                            </div>
                            <div class="pr-3"> 
                                <v-icon>mdi-heart</v-icon>
                                <span class="text-subtitle-2">200</span>
                            </div>
                            <div> 
                                <span class="text-subtitle-2">3일전</span>
                            </div>
                        </div>
                        <v-divider></v-divider >
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <v-row 
            class="mt-sm-5"
            dense 
            justify="start">
            <span class="font-weight-black">4게시판</span>
            <v-col cols="12">
                <v-card>
                    <div 
                        v-for="count in 4" 
                        :key="count"
                    >
                        <v-card-text 
                            class="text--primary">
                            [일반스터디] 고양,파주 지역중심 웹 게임,어플 제작 같이 하실 분 모집합니다 사진
                        </v-card-text>
                         <div class="d-flex justify-end mr-3">
                            <div class="pr-3">
                                <v-icon>mdi-account-box</v-icon>
                                <span class="text-subtitle-2">공돌돌이</span>
                            </div>
                            <div class="pr-3"> 
                                <v-icon>mdi-heart</v-icon>
                                <span class="text-subtitle-2">200</span>
                            </div>
                            <div> 
                                <span class="text-subtitle-2">3일전</span>
                            </div>
                        </div>
                        <v-divider></v-divider>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
import Banner from '@/components/page/Banner'
export default{
    components:{
        Banner
   },
   middleware: 'authenticated'
}

</script>
<style scoped>

</style>
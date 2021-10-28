<template>
  <NoticeList 
    :pageNo="pageNo"/>
</template>

<script>
import NoticeList from '@/components/page/board/NoticeList'

export default {

  components: {
    NoticeList
  },
  data(){
      return{
          pageNo : 1
      }
  },
  created(){
       this.pageNo = parseInt(this.$route.params.page,10);
  },
  middleware: 'authenticated'
}
</script>

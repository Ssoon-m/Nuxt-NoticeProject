<template>
  <NoticeList />
</template>

<script>
import NoticeList from '@/components/page/board/NoticeList'

export default {

  components: {
    NoticeList
  },
  middleware: 'authenticated'
}
</script>

<template>
  <v-app>
    <Header />
    <Nav />
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>

import Header from '@/components/layout/Header'
import Nav from '@/components/layout/Nav'

export default {

  components: {
    Header,
    Nav
  },

}
</script>

<template>
    <v-img
        class="mx-auto d-none d-sm-block"
        max-width="900"
        max-height="200"
        :src = "require('@/assets/images/banner.jpg')"
    >
        <template v-slot:placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>
</template>
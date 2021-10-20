<template>
    <NuxtLink style="text-decoration:none" to="/WritePage">
        <v-btn color="green" class="white--text">
            <v-icon>mdi-pencil</v-icon>
            <slot name="text"></slot>
        </v-btn>
    </NuxtLink>
</template>
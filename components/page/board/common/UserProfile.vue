<template>
    <div class="pa-4 d-flex align-center">
        <v-sheet
            color="blue"
            class="mr-2 lighten-3 rounded-circle"
            elevation="1"
            height="40"
            width="40"
        ></v-sheet>
        <ul class="pa-0" style="list-style:none">
            <li>
                <slot name="user"></slot>
            </li>
            <li class="d-flex text-caption font-weight-light">
                <slot name="day"></slot>
                <slot name="time"></slot>
            </li>
        </ul>
    </div>
</template>


<style lang="scss" scoped>
    .divide{
        position:relative;
        &::before{
            content: "";
            display: block;
            width: 1px;
            height: 10px;
            background-color: #ccc;
            position:absolute;
            top:0;
            bottom: 0;
            right:0;
            margin: auto 0; /* 세로 가운데 정렬 */
        }
    }
</style>
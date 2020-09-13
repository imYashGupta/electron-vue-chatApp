<template>
    <div id="app">
        <!-- <div class="top-bar">
     
        </div>-->
        <div class="vue-content">
            <router-view />
        </div>
    </div>
</template>
<script>
export default {
     
};
</script>
<style>
html,
body {
    margin: 0;
    height: 100%;
    overflow: hidden;
}
#app {
    height: 100%;
}
.top-bar {
    height: 30px;
    width: 100%;
    background-color: #44c4b8;
    -webkit-app-region: drag;
    position: fixed;
}
.vue-content {
    height: 100%;
    overflow-y: hidden;
    /* padding-top: 30px; */
}

img {
    user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
}
</style>

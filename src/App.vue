<template>
    <div id="app">
        <!-- <div class="top-bar">
     
        </div>-->
        <div class="vue-content">
            <transition 
                name="fade" mode="out-in">
                <router-view />
            </transition>
        </div>
    </div>
</template>
<script>
import app from "electron";
export default {
    created() {
        console.log(app);
    },
    
    
};
</script>
<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
html,
body {
    margin: 0;
    height: 100%;
    overflow: hidden;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
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

.no-select {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}

.can-select {
    -webkit-touch-callout: text !important; /* iOS Safari */
    -webkit-user-select: text !important; /* Safari */
    -khtml-user-select: text !important; /* Konqueror HTML */
    -moz-user-select: text !important; /* Firefox */
    -ms-user-select: text !important; /* Internet Explorer/Edge */
    user-select: text !important; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}

.btn-loading {
    opacity: 0.7;
    cursor: progress;
}

.page{
    position: relative;
    width: inherit;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 300ms ease;
}


.fade-leave-active {
  transition: opacity 300ms ease;
  opacity: 0;
}

</style>

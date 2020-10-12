<template>
    <div class="home page">
        <!-- Page loading -->
        <!-- <div class="page-loading"></div> -->
        <!-- ./ Page loading -->

        <!-- Body plate -->
        <div class="body-plate" @click="hideModalBg()"></div>
        <!-- ./ Body plate -->

        <!-- Disconnected modal -->
        <modals />
        <edit-profile></edit-profile>

        <app-header @logout="handleLogout" />

        <!-- Layout -->
        <div class="layout">
            <!-- Content -->
            <div class="content">
                <!-- Chats sidebar -->
                <active-chats :conversations="conversations" :loading="loading" @chat="handleChat" />
                <!-- ./ Chats sidebar -->

                <friends-sidebar />

                <!-- New chat sidebar -->
                <sidebar />
                <!-- ./ New chat sidebar -->

                <!-- Favorites sidebar -->
                <favorites-sidebar />
                <!-- ./ Stars sidebar -->

                <!-- Archived sidebar -->
                <archived-sidebar />
                <!-- ./ Archived sidebar -->

                <!-- Profile sidebar -->
                <profile-sidebar v-if="profile" :data="profile" />
                <!-- Profile sidebar -->

                <!-- Chat -->
                <!-- <chat-window :onChat="onChat"/> -->
                    <router-view :key="$route.fullPath"></router-view>

                <!-- ./ Chat -->
            </div>
            <!-- ./ Content -->
        </div>
        <!-- ./ Layout -->
    </div>
</template>

<script>
// @ is an alias to /src

import Modals from "./../components/Home/Modals";
import ActiveChats from "./../components/Home/ActiveChats";
import Header from "./../components/Header";

//sidebars
import Sidebar from "./../components/Home/Sidebar";
import Friends from "./../components/Friends";
import Favorites from "./../components/Favorites";
import Archived from "./../components/Archived";
import Profile from "./../components/Profile";
import EditProfile from './../components/Modals/EditProfile'
// import Chat from "./../components/Chat/Index";
import $ from "jquery";
import { eventBus } from "./../main";

export default {
    name: "Home",
    components: {
        sidebar: Sidebar,
        modals: Modals,
        "app-header": Header,
        "active-chats": ActiveChats,
        "friends-sidebar": Friends,
        "favorites-sidebar": Favorites,
        "archived-sidebar": Archived,
        "profile-sidebar": Profile,
        "edit-profile":EditProfile
        // "chat-window":Chat
    },
    data(){
        return {
            user:{},
            users:[],
            conversations:[],
            loading:false,
            onChat:false,
            records:[],
            profile:false,
        }
    },
    computed:{
        authUser(){
            return this.$store.getters.user;
        }
    },
    methods:{
        handleLogout(){
            this.$store.dispatch("logout").then(() => {
                this.$router.push("/");
            }).catch(error => {
                console.log(error);
            })
        },
        handleChat(conversation){
            this.onChat = conversation;
            if(!conversation){
                eventBus.$emit("chat",conversation);
            }
        },
        arraymove(arr, fromIndex, toIndex) {
                var element = arr[fromIndex];
                arr.splice(fromIndex, 1);
                arr.splice(toIndex, 0, element);
                return arr;
        },
        hideModalBg(){
            $(".body-plate").hide();
            console.log("[HIDE]");
            this.profile = false;
        }
    },
    created() {
        $("body").removeClass("form-membership");
        this.user=this.$store.getters.user;
        this.conversations = this.$store.getters.conversations;
        this.sockets.subscribe(this.authUser._id,(data) => {
            this.$store.commit("addMessage",{user:data.message.from_user,message:data.message});
        })

        eventBus.$on("SHOW_PROFILE",(data) => {
            this.profile = data;
        });

        eventBus.$on("CLOSE_PROFILE",() => {
            this.hideModalBg();
        })

         
    },
};
</script>
<style >
/* width */
::-webkit-scrollbar {
    width: 5px !important;
}

/* Track */
::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px transparent !important;
    border-radius: 10px !important;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #3f485d !important;
    border-radius: 10px !important;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: transparent !important;
}

 

</style>
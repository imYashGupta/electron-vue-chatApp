<template>
    <div class="home">
        <!-- Page loading -->
        <!-- <div class="page-loading"></div> -->
        <!-- ./ Page loading -->

        <!-- Body plate -->
        <div class="body-plate"></div>
        <!-- ./ Body plate -->

        <!-- Disconnected modal -->
        <modals />

        <app-header :user="user" @logout="handleLogout" />

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
                <profile-sidebar />
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
// import Chat from "./../components/Chat/Index";
import $ from "jquery";
import { eventBus } from "./../main";
import user from "../APIs/user";

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
        // "chat-window":Chat
    },
    data(){
        return {
            user:{},
            users:[],
            conversations:[],
            loading:false,
            onChat:false,
            records:[]
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
        sendMessage(messageObj,to){
            let tempId= messageObj._id;
            console.log('[tempid]',tempId)            
            user.send({
                text:messageObj.text,
                to:to._id
            },(response) => {
                console.log(response);
            },(error) => {
                console.log(error);
            })
        }
    },
    created() {
        console.log(this.$store.getters.conversationWith)
        $("body").removeClass("form-membership");
        this.user=this.$store.getters.user;
        this.conversations = this.$store.getters.conversations;
        /* eventBus.$on("send",({messageObj,to}) => {
            const getIndex=this.conversations.findIndex(convo => convo.id==to);
            this.sendMessage(messageObj,to,getIndex);
            this.conversations[getIndex].messages.push(messageObj);
            const top=this.arraymove(this.conversations,getIndex,0);
            this.conversations = top;
        }) */
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
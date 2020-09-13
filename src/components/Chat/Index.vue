<template>
    <div class="chat">
        <template >
            <div class="chat-header">
                <div class="chat-header-user">
                    <Avatar :user="user" size="avatar-lg"/>
                    <div>
                        <h5>{{user.name}}</h5>
                        <small class="text-muted">
                            <i>Online</i>
                        </small>
                    </div>
                </div>
                <div class="chat-header-action mt-2">
                    <ul class="list-inline">
                        <li class="list-inline-item">
                            <a href="#" class="btn btn-success">
                                <i class="fa fa-phone" aria-hidden="true"></i>
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a href="#" class="btn btn-secondary">
                                <i class="fa fa-video-camera" aria-hidden="true"></i>
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a href="#" class="btn btn-secondary" data-toggle="dropdown">
                                <i class="ti-more"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right">
                                <a
                                    href="#"
                                    data-navigation-target="contact-information"
                                    class="dropdown-item"
                                >Profile</a>
                                <a href="#" class="dropdown-item">Add to archive</a>
                                <a href="#" class="dropdown-item">Delete</a>
                                <div class="dropdown-divider"></div>
                                <a href="#" class="dropdown-item">Block</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="chat-body" tabindex="1" style=" outline: none;" ref="chatbody">
                <!-- Messages -->
                <messages :data-messages="messages"></messages>
                <!-- OR -->
            </div>
            <!-- Actions -->
            <Actions @send="sendMessage" :payload="{user,refId:messages._id}" />
        </template>
    </div>
</template>

<script>
import Messages from "./Messages";
import Actions from "./Actions";
import Mixin from "./../../mixin";
import $ from "jquery";
import { eventBus } from "../../main";
// import Axios from "axios";
import Avatar from './../ui/Avatar';
// const {socket}= require("./../../socket");

export default {
    mixins: [Mixin],
    data() {
        return {
            messages: [],
            user: {},
            isLoading:false,
            freshChat:false,
        };
    },
    components: {
        Messages,
        Actions,
        Avatar
    },
    methods: {
        sendMessage(text) {

            const message = {
                _id: +new Date(),
                isFile: false,
                from: this.authuser._id,
                to: this.user._id,
                text: text,
                createdAt: new Date(),
                from_user: {
                    _id: this.authuser._id,
                    name: this.authuser.name,
                    displayPicture: this.authuser?.displayPicture,
                },
                to_user: this.user,
                user: this.user,
                status: true,
            };
            this.$store.commit("addMessage", {
                user: this.user,
                message: message,
            });

            this.$store
                .dispatch("sendMessage", {
                    text: text,
                    to: this.user._id,
                    user: this.user,
                    message: message,
                })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
     
    created() {
        setTimeout(() => {
            $(".chat-body").animate({
                scrollTop: $(".chat-body").prop("scrollHeight"),
            });
        }, 100);
        eventBus.$on("freshStart",() => {
            console.log("freshStart")
            const conversation = this.$store.getters.conversations.find(
                (conversation) => conversation.id == user._id
            );
            this.messages = conversation.messages;
            console.log("freshStart",this.messages)
        });
        eventBus.$on("added", () => {
            
            setTimeout(() => {
                try{
                    this.$refs.chatbody.scrollTop =
                    this.$refs.chatbody.scrollHeight -
                    this.$refs.chatbody.clientHeight;
                }
                catch(e){
                    // console.log("error");
                    //ignore the height error
                }
            }, 10);
        });

        const {id,user} = this.$route.params;
        const conversation = this.$store.getters.conversations.find(
            (conversation) => conversation.id == id
        );
        if (conversation) {
            this.messages = conversation.messages;
            console.log("messages",this.messages)
            this.user = conversation.user;
            this.$store.commit("conversationWith", conversation.user);
        } else {
            this.user =user;
            this.$store.commit("conversationWith", user);
            // this.messages =   conversation.messages ;
            document.getElementById("friends").classList.remove("show");
        }
    }
};
</script>

<style>
.layout .content .chat .chat-header {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -moz-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    border-bottom: 2px solid #e1e1e1;
    padding: 10px;
    align-items: center;
    background-color: #26a69ad6;
}
.layout .content .chat .chat-header .chat-header-user {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -moz-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.layout .content .chat .chat-header .chat-header-user figure {
    margin-right: 1rem;
}
.layout .content .chat .chat-header .chat-header-user h5 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 0;
    line-height: 1;
}
.layout .content .chat .chat-header .chat-header-action ul {
    margin-bottom: 0;
}
.layout .content .chat .chat-header .chat-header-action ul > li > a {
    font-size: 16px;
}
</style>
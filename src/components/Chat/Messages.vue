<template>
    <div class="messages p-4" ref="messages">
        <Message
            v-for="(message,index) in messages"
            :key="message._id"
            :user="authuser"
            :message="message"
            :index="index"
            :oneafter="index==messages.length-1? false : messages[index+1]"
        />
       

        <!-- <div class="message-item messages-divider" data-label="1 message unread"></div> -->
    </div>
</template>

<script>
// import $ from "jquery";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import Message from "./Message.vue";

export default {
    props: ["dataMessages"],
    data() {
        return {
            authuser: {},
        };
    },
    components: {
        Message: Message,
    },
    computed:{
        messages(){
            return this.dataMessages;
        }
    },
    /* watch: {
        conversation(value) {
            this.messages = value;
        },
    }, */
    methods: {
        timeStr(ts) {
            TimeAgo.addLocale(en);
            const timeAgo = new TimeAgo("en-US");

            return timeAgo.format(new Date(ts));
        },
        strTime(ts) {
            console.log(ts);
            var d = new Date(); // Gets the current time
            var nowTs = Math.floor(d.getTime() / 1000); // getTime() returns milliseconds, and we need seconds, hence the Math.floor and division by 1000
            var seconds = nowTs - new Date(ts);

            // more that two days
            if (seconds > 2 * 24 * 3600) {
                return "a few days ago";
            }
            // a day
            if (seconds > 24 * 3600) {
                return "Yesterday";
            }

            if (seconds > 3600) {
                return Math.floor(seconds / 60 / 60) + " hours ago";
            }
            if (seconds > 1800) {
                return Math.floor(seconds / 60) + " minutes ago";
            }
            if (seconds > 60) {
                return Math.floor(seconds / 60) + " minutes ago";
            }
            return seconds;
        },
    },
    created() {
        this.authuser = this.$store.getters.user;
       
    },
};
</script>

<style>
</style>
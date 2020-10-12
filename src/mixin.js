import moment from "moment";
//import { app } from "electron";

import { eventBus } from "./main";
// import $ from "jquery";
import {shell} from "electron"

export default {
    computed:{
        authuser(){
            return this.$store.getters.user;
        }
    },
    methods:{
        openProfile(user,auth=false){
            eventBus.$emit("SHOW_PROFILE",{user,auth:auth});
        },
        closeProfile(){
            eventBus.$emit("CLOSE_PROFILE");
        },
        formatDate(ts,format){
            return moment(ts).format(format);
        },
        openLinks(url){
            shell.openExternal(url)
        }
    },
    created(){
        console.log("hello from mixins",this.authuser);
    }
}
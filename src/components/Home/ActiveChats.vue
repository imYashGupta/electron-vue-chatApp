<template>
  <div id="chats" class="sidebar chat-list active">
            <header>
                <span>Chats</span>
            </header>
            <form>
                <input type="text" class="form-control" placeholder="Search">
            </form>
            <div class="sidebar-body no-select">
                <ul class="list-group list-group-flush">
                    <router-link tag="li" class="list-group-item"  v-for="convo in conversations" :class="conversationsWith==convo.id ? 'active-chat' : ''" :key="convo.id" :to="{name:'chat',params:{id:convo.id,user:convo.user}}">
                        <Avatar :user="convo.user" />
                        <div class="users-list-body">
                            <div>
                                <h5 class="text-primary">{{convo.user.name}}</h5>
                                <p :class="conversationsWith==convo.id ? 'text-white' : ''" :key="convo.id">{{convo.messages[convo.messages.length-1].text}}</p>
                            </div>
                            <div class="users-list-action">
                                <!-- <div class="new-message-count">3</div> -->
                                <small class="text-primary">03:41 PM</small>
                            </div>
                        </div>
                    </router-link>
                </ul>
            </div>
            <div  style="height: 75px;margin: 1rem;">
                <button data-navigation-target="new-chat" class="btn btn-primary btn-block btn-lg ">New Chat</button>
            </div>
        </div>
</template>

<script>
import Avatar from "./../ui/Avatar";
export default {
    components:{
        Avatar
    },
    computed:{
        conversationsWith(){
            return this.$store.getters.conversationWith?._id;
        }
    },
     
    props:["conversations","loading"],
    
    
}
</script>

<style>

</style>
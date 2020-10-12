<template>
    <div class="message-item mb-1" :class="user._id!=message.to && 'outgoing-message'" >
       <!--  <div class="message-avatar"  >
            <figure class="avatar" title="message.user.name"  >
                <img src="/assets/images/placeholder/images.png" v-if="diffrence()"    class="rounded-circle" alt="image" />
            </figure>
        </div> -->
        <div>
            <div class="message-content can-select " :class="message.isFile && 'message-image'"> 
            <img v-if="message.isFile" :src="message.file" class="rounded" alt="image">
            {{ message.text }} 
            <div class="time no-select"   >
                {{time}}
                <!-- <i class="ti-double-check text-info"></i> -->
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
export default {
    props: ["message", "user", "index",'oneafter'],
    computed:{
        time(){
            return moment(this.message.createdAt).format("hh:mm A");
        }
    },
    methods:{
        diffrence(){
            if(this.oneafter!=false){
                const currentMsg =new Date(this.message.createdAt).getTime();
                const oneAfterMsg = new Date(this.oneafter.createdAt).getTime();
                const dif= Math.round((oneAfterMsg-currentMsg) / 1000);
                return dif > 30;
            }else{
                return true;
            }
           
        },
        
        
    },
    
    created(){
         
    }
};
</script>

<style>
</style>
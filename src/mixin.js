export default {
    data(){
        return {
            authuser:this.$store.getters.user,
        }
    },
    created(){
        console.log("hello from mixins",this.authuser);
    }
}
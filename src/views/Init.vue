<template>
    <div class="app">
        <div class="progress">
            <div
                class="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
                :style="'width:'+loading+'%'"
            ></div>
        </div>
        <h3 class="mt-3">Loading...</h3>
    </div>
</template>

<script>
export default {
    data(){
        return {
            loading:1,
            loaded:false,
        }
    },
    methods:{
        authenticate(token) {
            console.log("[tokne]",token);
            console.log("[__token]",localStorage.getItem("__token"));
            this.$store.dispatch("authenticate",token).then(response => {
                if(response.status==200){
                    return this.$store.dispatch("homeData") 
                }
            }).then(home => {
                console.log("[HOME]",home)
                this.loading=100;
                setTimeout(() => {
                    this.$router.push("home");    
                },500)
            }).catch(error => {
                console.log(error.response)
                    this.loading=100;
                setTimeout(() => {
                    //alert("login"); 
                    this.$router.push("Login");    
                },500)
            })
        },
        
    },
    created(){
        const token = localStorage.getItem("__token");
        console.log("[INIT]",token);
        if(token==null){
            setTimeout(() => {
                console.log("500")
                this.loading=100;
                setTimeout(()=>{
                    this.$router.push("Login");    
                },500)
            },1000)

        }
        else{
            this.authenticate(token);
            setTimeout(() => {
                this.loading=35;
            },500)
            setTimeout(() => {
                this.loading=75;
            },1000)
        }
    }
};
</script>

<style scoped>
    .app{
        margin-top: 20px;
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        height: 100%;
        margin-left: 25%;
        margin-right: 25%;
        flex-direction: column;
    }
    .progress{
        height: 10px !important;
        width: 100%;
    }

    .progress-bar{
        background-color: #44c4b8;
        transition-duration: 0.10s;
    }
</style>
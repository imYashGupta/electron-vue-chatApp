<template>
<div class="body-form-membership page">
      <div class="form-wrapper">

    <!-- logo -->
    <div class="logo">
        <img src="dist/media/img/small-logo.png" alt="logo">
    </div>
    <!-- ./ logo -->

    <h5>Sign in</h5>

    <template>

    </template>
    <div v-if="verifyEmailSent===true" class="alert alert-success bg-success text-white" role="alert">
        A verification email has been sent to you.
    </div>
     <div v-if="verifyEmailSent===false" class="alert alert-danger bg-danger text-white" role="alert">
        please wait 15 min before retry!
    </div>
    <!-- form -->
    <form>
         <div class="form-group">
            <input type="email"
                v-model.trim="$v.email.$model"
                :class="[
                    'form-control',
                    ($v.email.$error) && 'mb-0 is-invalid']"  
                    placeholder="Email" 
                    @blur="$v.email.$touch" >
                <span v-if="!$v.email.required" class="invalid-feedback" role="alert" >
                    <strong>The Email field is required.</strong>
                </span>      
                <span v-if="!$v.email.email" class="invalid-feedback" role="alert">
                    <strong>The email must be a valid email address.</strong>
                </span>
                <span v-if="!$v.email.serverError" class="invalid-feedback" role="alert">
                    <strong>{{serverError.email.message}}</strong>
                </span>
                 <!-- <span v-if="error.code!=0" class="invalid-feedback d-block" role="alert">
                    <strong>{{error.message}}</strong>
                </span> -->
                <!-- {{$v.email}} -->
        </div>
        <div class="form-group">
            <input type="password"
                v-model.number="$v.password.$model"
                :class="[
                    'form-control',
                    ($v.password.$error) && 'mb-0 is-invalid']"  
                placeholder="Password" 
                @blur="$v.password.$touch" >
                <span v-if="!$v.password.required" class="invalid-feedback" role="alert" >
                    <strong>The Password is required.</strong>
                </span>      
               
        </div>
        <div class="form-group d-flex justify-content-between">
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" checked="" id="customCheck1">
                <label class="custom-control-label" for="customCheck1">Remember me</label>
            </div>
            <router-link to="verify-email">Reset password</router-link>
        </div>
        <button @click.prevent="login()" :disabled="loading" class="btn btn-primary btn-block">Sign in
            <span v-if="loading" class="spinner-grow spinner-grow-sm ml-3" role="status" aria-hidden="true"></span>
        </button>
        <hr>
        <p class="text-muted">Login with your social media account.</p>
        <ul class="list-inline">
            <li class="list-inline-item">
                <a href="#" class="btn btn-floating btn-facebook">
                    <i class="fa fa-facebook"></i>
                </a>
            </li>
            <li class="list-inline-item">
                <a href="#" class="btn btn-floating btn-twitter">
                    <i class="fa fa-twitter"></i>
                </a>
            </li>
            <li class="list-inline-item">
                <a href="#" class="btn btn-floating btn-dribbble">
                    <i class="fa fa-dribbble"></i>
                </a>
            </li>
            <li class="list-inline-item">
                <a href="#" class="btn btn-floating btn-linkedin">
                    <i class="fa fa-linkedin"></i>
                </a>
            </li>
            <li class="list-inline-item">
                <a href="#" class="btn btn-floating btn-google">
                    <i class="fa fa-google"></i>
                </a>
            </li>
            <li class="list-inline-item">
                <a href="#" class="btn btn-floating btn-behance">
                    <i class="fa fa-behance"></i>
                </a>
            </li>
            <li class="list-inline-item">
                <a href="#" class="btn btn-floating btn-instagram">
                    <i class="fa fa-instagram"></i>
                </a>
            </li>
        </ul>
        <hr>
        <p class="text-muted">Don't have an account?</p>
        <router-link to="register" class="btn btn-outline-light btn-sm">Register now!</router-link>
    </form>
    <!-- ./ form -->

</div>
</div>
</template>

<script>
import $ from 'jquery';
import { required,email } from 'vuelidate/lib/validators';

// import Axios from "axios";
const vue= {
    data(){
        return {
            email:"yashgupta@mozej.com",
            password:"123456",
            loading:false,
            serverError:{
                email:{
                    status:false,
                    message:""
                }
            },
            verifyEmailSent:null,
            emailNotVerify:false,
            attempt:0,
        }
    },
    watch:{
        email(){
            if(this.attempt > 0){
                this.serverError.email.status=false;
            }
        }
    },
    methods:{
        login(){
                
            if(this.$v.$invalid){
                this.$v.$touch()
                return;
            }
            this.attempt=this.attempt+1;
            this.loading=true;
            this.$store.dispatch("login",{email:this.email,password:this.password})
            .then(res => {
                this.loading=false;
                localStorage.setItem("__token",res.data.token);
                // localStorage.setItem("__user",JSON.s);
                this.$router.push("/");
            }).catch(e => {
                console.log(e)
                this.loading=false;
                if (e.response.status===401) {
                    this.serverError.email.status=true;
                    this.serverError.email.message=e.response.data.message;
                }
                if(e.response.status===422){
                    console.log("log")
                        //verification email is sent
                        // this.serverError.email.status=true;
                        this.emailNotVerify=true;
                        this.verifyEmailSent = e.response.data?.error?.retry;
                        return;
                }
                
            });
        },
    },
    validations:{
        email:{
            required,
            email,
            serverError:(value,v) => {
                return !v.serverError.email.status;
            },
        },
        password:{
            required,
        }
    },
    created(){
        $("body").addClass("form-membership");
        localStorage.removeItem("__token");
        


    }
}

export default vue;
</script>

<style scoped>
   ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: rgba(200, 200, 200, 0.438) !important;
  opacity: 1; /* Firefox */
}
.invalid-feedback{
    text-align: left;
    font-size: 13px;
    margin-left: 2px;
    margin-top: 5px;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}


body.dark input, body.dark select, body.dark textarea {
    background-color: #2e364a !important;
    color: rgba(255, 255, 255, 0.7);
    border-color: #424a5e !important;
}

.page{
    position: relative;
    width: inherit;
}
</style>
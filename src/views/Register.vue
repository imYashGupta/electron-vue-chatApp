<template>
<div class="body-form-membership">
    <div class="form-wrapper">

    <!-- logo -->
    <div class="logo">
        <img src="dist/media/img/small-logo.png" alt="logo">
    </div>
    <!-- ./ logo -->

    <h5>Create account</h5>

    <!-- form -->
    <form>
        <div class="form-group">
            <input type="text"  
                v-model.trim="$v.name.$model" 
                :class="[
                    'form-control',
                    ($v.name.$error) && 'mb-0 is-invalid',
                    ($v.name.$dirty==true && $v.name.$error==false) && 'is-valid']"   
                @blur="$v.name.$touch" 
                placeholder="Your name"  >
            <span v-if="!$v.name.required" class="invalid-feedback" role="alert" >
                <strong>The Name field is required.</strong>
            </span>      
            <span v-if="!$v.name.minLength" class="invalid-feedback" role="alert">
                <strong class="text-warning">The name must be at least 3 characters.</strong>
            </span>
        </div>
        <div class="form-group">
            <input type="email"
                v-model.trim="$v.email.$model"
                :class="[
                    'form-control',
                    ($v.email.$error) && 'mb-0 is-invalid',
                    ($v.email.$dirty==true && $v.email.$error==false) && 'is-valid']"  
                    placeholder="Email" 
                    @blur="$v.email.$touch" >
                <span v-if="!$v.email.required" class="invalid-feedback" role="alert" >
                    <strong>The Email field is required.</strong>
                </span>      
                <span v-if="!$v.email.email" class="invalid-feedback" role="alert">
                    <strong>The email must be a valid email address.</strong>
                </span>
                <span v-if="!$v.email.alreadyExists" class="invalid-feedback" role="alert">
                    <strong>{{serverErrors.email.message}}</strong>
                </span>
        </div>
        <div class="form-group">
            <input type="number" 
                v-model.number="$v.phone.$model"
                :class="[
                    'form-control',
                    ($v.phone.$error) && 'mb-0 is-invalid',
                    ($v.phone.$dirty==true && $v.phone.$error==false) && 'is-valid']"   
                placeholder="Phone No." 
                @blur="$v.phone.$touch" >
                 <span v-if="!$v.phone.required" class="invalid-feedback" role="alert" >
                    <strong>The Phone number is required.</strong>
                </span>      
                <span v-if="!$v.phone.numeric" class="invalid-feedback" role="alert">
                    <strong>Please Enter a valid phone number.</strong>
                </span>
                <span  v-else-if="!$v.phone.minLength || !$v.phone.maxLength" class="invalid-feedback" role="alert">
                    <strong class="text-warning">Please Enter 10-digit phone number.</strong>
                </span>
        </div>
        <div class="form-group">
            <input type="password"
                v-model.number="$v.password.$model"
                :class="[
                    'form-control',
                    ($v.password.$error) && 'mb-0 is-invalid',
                    ($v.password.$dirty==true && $v.password.$error==false) && 'is-valid']"  
                placeholder="Password" 
                @blur="$v.password.$touch" >
                <span v-if="!$v.password.required" class="invalid-feedback" role="alert" >
                    <strong>The Password is required.</strong>
                </span>      
                <span v-if="!$v.password.minLength" class="invalid-feedback" role="alert">
                    <strong class="text-warning">The password must be at least of 6 characters.</strong>
                </span>
        </div>
        <button @click.prevent="register()" :disabled="loading" class="btn btn-primary btn-block">Register
            <span v-if="loading" class="spinner-grow spinner-grow-sm ml-3" role="status" aria-hidden="true"></span>
        </button>
        <hr>
        <p class="text-muted">Already have an account?</p>
        <router-link to="/login" class="btn btn-outline-light btn-sm">Sign in! </router-link>
    </form>
    <!-- ./ form -->

</div>

</div>
</template>

<script>
import $ from 'jquery'
import { required,minLength,email,maxLength,numeric } from 'vuelidate/lib/validators'

export default {
    data(){
        return {
            name:"",
            email:"",
            phone:"",
            password:"",
            serverErrors:{
                email:{
                    message:"",
                    show:false,
                    code:""
                }
            },
            attempt:0,
            loading:false
        }
    },
    watch:{
        email(){
            if(this.attempt > 0){
                this.serverErrors.email.show=false;
            }
        }
    },
    methods:{
        register(){
            this.attempt = this.attempt +1;
            if(this.$v.$invalid){
                this.$v.$touch()
                return;
            }
            this.loading = true;
            this.$store.dispatch("register",{
                name:this.name,
                email:this.email,
                phone:this.phone,
                password:this.password,
            }).then(response => {
                this.loading = false;
                this.$router.push({name:"verify",params:{
                    user:JSON.stringify({
                        _id:response.data.user._id,
                        name:this.name,
                        email:this.email,
                        password:this.password,
                    })
                }});
            }).catch(error => {
                this.loading = false;
                console.log(error.response);
                if(error.response.status==500){
                    if(error.response.data.error.name=="MongoError"){
                        //server error related to mongoDB
                        if(error.response.data.error.code==11000){
                            //email already register error
                            this.serverErrors.email.message="Email is already exists.";
                            this.serverErrors.email.show=true;
                            this.serverErrors.email.code = 11000;
                        }
                    }
                }
            })

            
        },
    },
    validations:{
        name:{
            required,
            minLength:minLength(3)
        },
        email:{
            required,
            email,
            alreadyExists:(value,vue) => {
                return !vue.serverErrors.email.show;
            }
        },
        phone:{
            required,
            numeric,
            minLength:minLength(10),
            maxLength:maxLength(10),
        },
        password:{
            required,
            minLength:minLength(6),
        }
    },
    created(){
        $("body").addClass("form-membership");
    }
}
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
</style>
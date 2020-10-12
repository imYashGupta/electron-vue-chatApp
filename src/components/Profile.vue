<template>
  <div id="contact-information" class="sidebar">
            <header>
                <span>Profile</span>
                <ul class="list-inline">
                    <li class="list-inline-item" v-if="auth">
                        <a href="#" class="btn btn-outline-light" data-toggle="modal" data-target="#editProfileModal"
                           title="Edit profile">
                            <i class="mdi mdi-pencil"></i>
                        </a>
                    </li>
                    <li class="list-inline-item">
                        <a @click="closeProfile()" href="#" class="btn btn-danger sidebar-close">
                            <i class="mdi mdi-close"></i>
                        </a>
                    </li>
                </ul>
            </header>
            <div class="sidebar-body">
                <div class="text-center">
                    <!-- <figure class="avatar avatar-xl mb-4">
                        <img src="dist/media/img/avatar3.png" class="rounded-circle" alt="image">
                    </figure> -->
                    <Avatar :user="user" size="avatar-xl mb-4" />
                    <h5 class="mb-1">{{user.name}}</h5>
                    <small v-if="loaded" class="text-muted font-italic">Joined On: {{formatDate(user.createdAt,"DD MMM,YYYY")}}</small>
                    <ul  v-if="loaded" class="nav nav-tabs justify-content-center mt-5" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab"
                               aria-controls="home" aria-selected="true">About</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab"
                               aria-controls="profile" aria-selected="false">Media</a>
                        </li>
                    </ul>
                </div>
                <div  v-if="loaded" class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <p v-if="user.meta.about!=undefined" class="text-muted">{{user.meta.about}}</p>
                        <div class="mt-4 mb-4">
                            <h6>Email</h6>
                            <p  class="text-primary text-isemail"><a :href="'mailto:'+user.email">{{user.email}}</a></p>
                        </div>
                        <div class="mt-4 mb-4">
                            <h6>Phone</h6>
                            <p class="text-muted">+91 {{user.phone}}</p>
                        </div>
                        <div class="mt-4 mb-4" v-if="user.meta.city">
                            <h6>City</h6>
                            <p class="text-muted">{{user.meta.city}}</p>
                        </div>
                        <div class="mt-4 mb-4"  v-if="user.meta.website">
                            <h6>Website</h6>
                            <p>
                                <a @click.prevent="openLinks(user.meta.website)" class="can-select" href="#">{{user.meta.website}}</a>
                            </p>
                        </div>
                        <div class="mt-4 mb-4" v-if="user.socialMediaHandles">
                            <h6 class="mb-3">Social media accounts</h6>
                            <ul class="list-inline social-links">
                                <li class="list-inline-item" v-if="user.socialMediaHandles.facebook">
                                    <a @click.prevent="openLinks('https://www.facebook.com/'+user.socialMediaHandles.facebook)" href="#" class="btn btn-sm btn-floating btn-facebook"
                                       data-toggle="tooltip" title="Facebook">
                                        <i class="mdi mdi-facebook"></i>
                                    </a>
                                </li>
                                <li class="list-inline-item" v-if="user.socialMediaHandles.twitter">
                                    <a @click.prevent="openLinks('https://twitter.com/'+user.socialMediaHandles.twitter)" href="#" class="btn btn-sm btn-floating btn-twitter"
                                       data-toggle="tooltip" title="Twitter">
                                        <i class="mdi mdi-twitter"></i>
                                    </a>
                                </li>
                               
                                <li class="list-inline-item" v-if="user.socialMediaHandles.instagram">
                                    <a @click.prevent="openLinks('https://instagram.com/'+user.socialMediaHandles.instagram)" href="#" class="btn btn-sm btn-floating btn-instagram"
                                       data-toggle="tooltip" title="Instagram">
                                        <i class="mdi mdi-instagram"></i>
                                    </a>
                                </li>
                                <li class="list-inline-item" v-if="user.socialMediaHandles.linkedin">
                                    <a @click.prevent="openLinks('https://linkedin.com/'+user.socialMediaHandles.linkedin)" href="#" class="btn btn-sm btn-floating btn-linkedin"
                                       data-toggle="tooltip" title="Linkedin">
                                        <i class="mdi mdi-linkedin"></i>
                                    </a>
                                </li>
                                <li class="list-inline-item" v-if="user.socialMediaHandles.youtube">
                                    <a @click.prevent="openLinks('https://youtube.com/'+user.socialMediaHandles.youtube)" href="#" class="btn btn-sm btn-floating btn-youtube" data-toggle="tooltip"
                                       title="Google">
                                        <i class="mdi mdi-youtube"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="mt-4 mb-4">
                            <h6 class="mb-3">Settings</h6>
                            <div class="form-group">
                                <div class="form-item custom-control custom-switch">
                                    <input type="checkbox" class="custom-control-input" id="customSwitch11">
                                    <label class="custom-control-label" for="customSwitch11">Block</label>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="form-item custom-control custom-switch">
                                    <input type="checkbox" class="custom-control-input" checked=""
                                           id="customSwitch12">
                                    <label class="custom-control-label" for="customSwitch12">Mute</label>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="form-item custom-control custom-switch">
                                    <input type="checkbox" class="custom-control-input" id="customSwitch13">
                                    <label class="custom-control-label" for="customSwitch13">Get
                                        notification</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <h6 class="mb-3 d-flex align-items-center justify-content-between">
                            <span>Recent Files</span>
                            <a href="#" class="btn btn-link small">
                                <i data-feather="upload" class="mr-2"></i> Upload
                            </a>
                        </h6>
                        <div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item pl-0 pr-0 d-flex align-items-center">
                                    <a href="#">
                                        <i class="fa fa-file-pdf-o text-danger mr-2"></i> report4221.pdf
                                    </a>
                                </li>
                                <li class="list-group-item pl-0 pr-0 d-flex align-items-center">
                                    <a href="#">
                                        <i class="fa fa-image text-muted mr-2"></i> avatar_image.png
                                    </a>
                                </li>
                                <li class="list-group-item pl-0 pr-0 d-flex align-items-center">
                                    <a href="#">
                                        <i class="fa fa-file-excel-o text-success mr-2"></i>
                                        excel_report_file2020.xlsx
                                    </a>
                                </li>
                                <li class="list-group-item pl-0 pr-0 d-flex align-items-center">
                                    <a href="#">
                                        <i class="fa fa-file-text-o text-warning mr-2"></i> articles342133.txt
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div v-else class="text-center mt-5">
                    <Spinner />
                </div>
            </div>
        </div>
</template>

<script>
import Axios from 'axios';
import Mixin from "./../mixin";
import Avatar from "./ui/Avatar";
import Spinner from "./ui/Spinner";
export default {
    props:["data"],
    data(){
        return {
            loaded:false,
            loadedUser:null,
        }
    },
    computed:{
        user(){
            if(this.data.auth){
                return this.$store.getters.user;
            }
            else{
                if(this.loadedUser==null){
                    return this.data.user;
                }else{
                    return this.loadedUser;
                }
            }
        },
        auth(){
            return this.data.auth;
        }
    },
    mixins:[Mixin],
    components:{
        Avatar,Spinner
    },
    created(){
        if(this.data.auth==false){
            Axios.post("user/get",{
                id:this.user._id
            }).then(response => {
                this.loaded = true;
                this.loadedUser = response.data;
            }).catch(err => {
                console.log(err);
            })
        }else{
            this.loaded=true;
        }
    },
    destroyed(){
        console.log("[Profile destory]");
    }
}
</script>

<style scoped>
    .mdi{
        font-size: 18px;
    }
    .text-isemail::first-letter{
        text-transform: uppercase;
    }
</style>

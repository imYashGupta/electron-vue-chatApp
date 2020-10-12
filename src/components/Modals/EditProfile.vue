<template>
    <div class="modal fade" id="editProfileModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-zoom" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i data-feather="edit-2" class="mr-2"></i> Edit Profile
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <i class="mdi mdi-close"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <ul class="nav nav-tabs" role="tablist">
                        <li class="nav-item">
                            <a
                                class="nav-link active"
                                data-toggle="tab"
                                href="#personal"
                                role="tab"
                                aria-controls="personal"
                                aria-selected="true"
                            >Personal</a>
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                data-toggle="tab"
                                href="#about"
                                role="tab"
                                aria-controls="about"
                                aria-selected="false"
                            >About</a>
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                data-toggle="tab"
                                href="#social-links"
                                role="tab"
                                aria-controls="social-links"
                                aria-selected="false"
                            >Social Links</a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane show active" id="personal" role="tabpanel">
                            <form @submit.prevent="updateProfile($event)">
                                <div class="form-group">
                                    <label for="fullname" class="col-form-label">Fullname</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" spellcheck="false" id="fullname" v-model="profile.name"  />
                                        <div class="input-group-append">
                                            <span class="input-group-text">
                                                <i class="mdi mdi-account-outline"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-form-label">Avatar</label>
                                    <div class="d-flex align-items-center">
                                        <div>
                                            <figure class="avatar mr-3 item-rtl">
                                                <img
                                                    v-if="profile.displayPicture"
                                                    :src="profile.displayPicture"
                                                    class="rounded-circle"
                                                    alt="image"
                                                />
                                                <span
                                                    v-else
                                                    class="avatar-title bg-success rounded-circle"
                                                    :class="user.meta.color[0]"
                                                >{{ user.name[0] }}</span>
                                            </figure>
                                        </div>
                                        <div class="custom-file">
                                            <input
                                                type="file"
                                                class="custom-file-input"
                                                id="customFile"
                                                ref="displayPicture"
                                                @change="imageHandler"
                                            />
                                            <label
                                                class="custom-file-label"
                                                for="customFile"
                                            >Choose file</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="city" class="col-form-label">City</label>
                                    <div class="input-group">
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="city"
                                            placeholder="Ex: Columbia"
                                            v-model="profile.city"
                                        />
                                        <div class="input-group-append">
                                            <span class="input-group-text">
                                                <i class="mdi mdi-home-map-marker"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="phone" class="col-form-label">Phone</label>
                                    <div class="input-group">
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="phone"
                                            placeholder="(555) 555 55 55"
                                            v-model="profile.phone"
                                        />
                                        <div class="input-group-append">
                                            <span class="input-group-text">
                                                <i class="mdi mdi-cellphone-iphone"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="website" class="col-form-label">Website</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="website"
                                        placeholder="https:///"
                                        v-model="profile.website"
                                    />
                                </div>
                                <div class="form-group d-flex justify-content-end align-items-baseline mt-4">
                                    <p v-if="profile.saved===true" class="mr-3 text-primary">Saved.</p>
                                    <button type="submit" class="btn btn-primary" :class="profile.saving===true && 'btn-loading'">Save  
                                          <span v-if="profile.saving===true" class="spinner-grow spinner-grow-sm ml-1" role="status" aria-hidden="true"></span>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div class="tab-pane" id="about" role="tabpanel">
                            <form @submit.prevent="updateAbout()">
                                <div class="form-group">
                                    <label for="about-text" class="col-form-label">
                                        Write a few words that describe
                                        you
                                    </label>
                                    <textarea v-model="about.about" class="form-control" id="about-text"></textarea>
                                </div>
                                <div class="form-group d-flex justify-content-end align-items-baseline mt-4">
                                    <p v-if="about.saved===true" class="mr-3 text-primary">Saved.</p>
                                    <button type="submit" class="btn btn-primary" :class="about.saving===true && 'btn-loading'">Save  
                                        <span v-if="about.saving===true" class="spinner-grow spinner-grow-sm ml-1" role="status" aria-hidden="true"></span>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div class="tab-pane" id="social-links" role="tabpanel">
                            <form @submit.prevent="updateSocials()">
                                <div class="form-group">
                                    <div class="input-group">
                                        <input
                                            type="text"
                                            class="form-control"
                                            placeholder="Username"
                                            v-model="social.facebook"
                                        />
                                        <div class="input-group-append">
                                            <span class="input-group-text bg-facebook">
                                                <i class="mdi mdi-facebook"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="input-group">
                                        <input
                                            type="text"
                                            class="form-control"
                                            placeholder="Username"
                                            v-model="social.twitter"

                                        />
                                        <div class="input-group-append">
                                            <span class="input-group-text bg-twitter">
                                                <i class="mdi mdi-twitter"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="input-group">
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="social.instagram"
                                            placeholder="Username"
                                        />
                                        <div class="input-group-append">
                                            <span class="input-group-text bg-instagram">
                                                <i class="mdi mdi-instagram"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="input-group">
                                        <input
                                            type="text"
                                            class="form-control"
                                            placeholder="Username"
                                            v-model="social.linkedin"

                                        />
                                        <div class="input-group-append">
                                            <span class="input-group-text bg-linkedin">
                                                <i class="mdi mdi-linkedin"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <div class="input-group">
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="social.youtube"
                                            placeholder="Username"
                                        />
                                        <div class="input-group-append">
                                            <span class="input-group-text bg-youtube">
                                                <i class="mdi mdi-youtube"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                               <div class="form-group d-flex justify-content-end align-items-baseline mt-4">
                                    <p v-if="social.saved===true" class="mr-3 text-primary">Saved.</p>
                                    <button type="submit" class="btn btn-primary" :class="social.saving===true && 'btn-loading'">Save  
                                        <span v-if="social.saving===true" class="spinner-grow spinner-grow-sm ml-1" role="status" aria-hidden="true"></span>
                                    </button>
                                </div>
                                 
                            </form>
                        </div>
                    </div>
                </div>
               <!--  <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Save</button>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';
export default {
    data(){
        return {
            profile:{
                name:'',
                city:'',
                phone:'',
                website:'',
                saving:null,
                saved:null,
                previewImage:null,
                displayPicture:null,
            },
            about:{
                about:"",
                saving:null,
                saved:null,
            },
            social:{
                facebook:"",
                twitter:"",
                instagram:"",
                linkedin:"",
                youtube:"",
                saving:null,
                saved:null,
            }
        }
    },
    watch:{
        'profile.saved' : function(newValue){
            if(newValue===true){
                setTimeout(() => {
                    this.profile.saved=null;
                },3000);
            }
        },
        'about.saved' : function(newValue){
            if(newValue===true){
                setTimeout(() => {
                    this.about.saved=null;
                },3000);
            }
        },
        'social.saved' : function(newValue){
            if(newValue===true){
                setTimeout(() => {
                    this.social.saved=null;
                },3000);
            }
        }    
    },
    computed:{
        user(){
            return this.$store.getters.user;
        }
    },
    methods:{
        imageHandler(e){
            const file = e.target.files[0];
            this.profile.displayPicture = URL.createObjectURL(file);
        },
        updateProfile(){
            //TODO Validations
            this.profile.saving = true;
            const {name,phone,city,website} = this.profile;
            let formData = new FormData();
            formData.append("name",name);
            formData.append("phone",phone);
            formData.append("city",city);
            formData.append("website",website);
            const files = this.$refs.displayPicture.files;
            if(files.length > 0) {
                formData.append("avatar",files[0]);                
            }
            Axios.post("user/update",formData,{
                headers:{
                    'Content-Type' : 'multipart/form-data'
                }
            }).then(response => {
                console.log(response)
                this.$store.commit("updateProfile",response.data);
                this.profile.saving = false;
                this.profile.saved = true;
            }).catch(err =>{ 
                //TODO add a better error feedback
                console.log(err);
            })
        },
        updateAbout(){
            this.about.saving = true;
            Axios.post("/user/about",{
                about:this.about.about
            }).then(response => {
                this.about.saved = true;
                this.about.saving = null;
                this.$store.commit("updateProfile",response.data);
                console.log(response);
            }).catch(err => {
                console.log(err);
            })
        },
        updateSocials(){
            this.social.saving = true;
            Axios.post("/user/socials",{
                facebook:this.social.facebook,
                twitter:this.social.twitter,
                instagram:this.social.instagram,
                linkedin:this.social.linkedin,
                youtube:this.social.youtube,
            }).then(response => {
                this.social.saved = true;
                this.social.saving = null;
                this.$store.commit("updateProfile",response.data);
                console.log(response);
            }).catch(err => {
                console.log(err);
            });
        }
    },
    created(){
        this.profile.name = this.user.name;
        this.profile.city = this.user.meta?.city || "";
        this.profile.phone = this.user.phone;
        this.profile.website = this.user.meta?.website || "";
        this.profile.displayPicture = this.user?.displayPicture || null;
        this.about.about = this.user.meta?.about || "";
        this.social = {...this.social,...this.user?.socialMediaHandles};
        console.log(this.social);
    }
};
</script>

<style>
.mdi{
    font-size: 20px;
}
.input-group-text {   
    padding: 0rem 0.75rem;
}
</style>
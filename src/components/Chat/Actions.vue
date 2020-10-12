<template>
    <div class="chat-footer">
        <form>
            <div>
                <button
                    class="btn btn-light mr-3 d-none d-sm-inline-block"
                    data-toggle="tooltip"
                    title
                    type="button"
                    data-original-title="Emoji"
                    @click="showEmojis()"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-smile"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                        <line x1="9" y1="9" x2="9.01" y2="9" />
                        <line x1="15" y1="9" x2="15.01" y2="9" />
                    </svg>
                </button>
                <button
                    class="btn btn-danger mr-3 d-inline d-sm-none btn-close-chat"
                    data-toggle="tooltip"
                    title
                    type="button"
                    data-original-title="Emoji"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-arrow-left"
                    >
                        <line x1="19" y1="12" x2="5" y2="12" />
                        <polyline points="12 19 5 12 12 5" />
                    </svg>
                </button>
            </div>
            <input
                type="text"
                class="form-control"
                ref="text"
                v-model="text"
                placeholder="Write a message."
            />
            <div class="form-buttons">
                <div class="dropdown">
                    <button
                        class="btn btn-light d-none d-sm-inline-block"
                        data-toggle="dropdown"
                        title
                        type="button"
                        data-original-title="Add files"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-paperclip"
                        >
                            <path
                                d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
                            />
                        </svg>
                    </button>
                    <div class="dropdown-menu dropdown-menu-left mb-4 mr-3">
                        <a
                            href="#"
                            class="dropdown-item"
                            @click.prevent="openFilePicker('image/*','image')"
                        ><i class="mdi mdi-image"></i> Image</a>
                        <a
                            href="#"
                            class="dropdown-item"
                            data-toggle="modal"
                        ><i class="mdi mdi-file"></i> Document</a>
                        <a
                            href="#"
                            class="dropdown-item"
                            data-toggle="modal"
                            @click.prevent="openFilePicker('video/*','video')"
                        ><i class="mdi mdi-video"></i> Video</a>
                    </div>
                </div>
                <!-- <button
                    class="btn btn-light d-none d-sm-inline-block"
                    data-toggle="tooltip"
                    title
                    type="button"
                    data-original-title="Send a voice record"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-mic"
                    >
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                        <line x1="12" y1="19" x2="12" y2="23" />
                        <line x1="8" y1="23" x2="16" y2="23" />
                    </svg>
                </button>-->
                <button @click.prevent="send()" class="btn btn-primary" type="submit">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-send"
                    >
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                </button>
                <input ref="fileInput" type="file" id="media" class="d-none" @change="handleFiles" multiple />
            </div>
        
        </form>
        
    </div>
</template>

<script>
import { Video  } from 'video-metadata-thumbnails';
import { remote } from "electron";
export default {
    props:["payload"],
    data() {
        return {
            text: "",
            type:"",
        };
    },
    methods: {
        send() {
            // console.log("em")
            if (this.text == "") {
                return;
            }
            this.$emit("send", this.text);
            this.text = "";
        },
        showEmojis() {
            this.$refs.text.focus();
            remote.app.showEmojiPanel();
            console.log(remote.app);
        },
        openFilePicker(accept,type){
            this.$refs.fileInput.setAttribute("accept",accept);
            this.type=type;
            this.$refs.fileInput.click();
        },
        async handleFiles(){
            const fileList = this.$refs.fileInput.files;
            const files = Array.from(fileList);
            const thumbs= [];
            if(this.type=='video'){
                for(const f of files){
                    const video = new Video(f);
                    const thumbnails=await video.getThumbnails({
                        quality: 0.6
                    })
                    var reader = new FileReader();
                    reader.readAsDataURL(thumbnails[0].blob); 
                    reader.onloadend = function() {
                        var base64data = reader.result; 
                        thumbs.push(base64data);        
                    }
                }
            }
            
            this.$store.commit("addMedia",{_id:this.payload.user._id,files:files,type:this.type,thumbs:thumbs});
        },
        
    },
};
</script>

<style>
</style>
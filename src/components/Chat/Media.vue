<template>
    <div class="module-media">
        <div class="media-header pt-2">
            <button
                class="btn btn-danger float-right mr-3"
                @click="clearMedia()"
            >
                <i class="mdi mdi-close" aria-hidden="true"></i>
            </button>
        </div>
        <div class="media-main">
            <div class="media-preview">
                <img
                    v-if="filetype == 'image'"
                    height="100%"
                    class="img-fluid"
                    :src="createReadableUri(files[previewIndex],true)"
                    alt=""
                    srcset=""
                    style="max-height: 465px;"
                />
                <video
                    v-if="filetype == 'video'"
                    style="max-height: 465px;"
                    controls
                    controlslist="nodownload"
                    disablePictureInPicture
                    :src="createReadableUri(files[previewIndex],true)"
                ></video>
            </div>
            <div class="chat-footer">
                <form>
                    <div>
                        <button
                            class="btn btn-light mr-3 d-none d-sm-inline-block"
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
                                class="feather feather-smile"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                <line x1="9" y1="9" x2="9.01" y2="9" />
                                <line x1="15" y1="9" x2="15.01" y2="9" />
                            </svg>
                        </button>
                    </div>
                    <input
                        type="text"
                        class="form-control"
                        ref="text"
                        placeholder="Caption"
                        @input="addCaptionToFile($event)"
                        :value="files[previewIndex].caption"
                    />
                </form>
            </div>
            <!-- main -->
        </div>
        <div class="media-files">
            <div class="right-col">
                <div
                    v-for="(file, i) in files"
                    :key="file.name"
                    @click="previewFile(i)"
                    class="additional-image-box"
                    :class="previewIndex == i && 'activePreview'"
                    :style="
                        'background-image:url(' +  createReadableUri(file,false,filetype=='image',i) + ')'
                    "
                >
                    <span
                        class="remove-media-btn"
                        @click.stop="removeMediaFile(i)"
                    >
                        <i class="mdi mdi-close" />
                    </span>
                    <!-- <div>{{file.thumbnail}}</div>
                     <img 
                        class="additional-images img-fluid"
                        alt=""
                        srcset=""   
                       
                        :src="thumbs[i]"
                    /> -->
                </div>
            </div>
            <div class="left-action">
                <button
                    @click.prevent="send()"
                    class="btn btn-primary send-btn"
                    type="submit"
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
                        class="feather feather-send"
                    >
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: ["user"],
    data() {
        return {
            previewIndex: 0,
            image:"",
            rnd:"",
            files:[],
            thumbs:[],
        };
    },
    computed: {
        
        filetype() {
            const data = this.$store.state.media.find(
                (m) => m._id == this.user._id
            );
            return data.type;
        },
        
    },
    methods: {
        clearMedia() {
            this.$store.commit("removeMedia", this.user);
        },
        createReadableUri(fileListObj,isMain,isImage,index) {
            if(isMain){
                return URL.createObjectURL(fileListObj); 
            }else{
                if(isImage===false){
                    return this.thumbs[index];
                }else{
                    return URL.createObjectURL(fileListObj); 
                }
            }
        },
        previewFile(index) {
            this.previewIndex = index;
        },
        removeMediaFile(index) {
            console.log(index);
            this.$store.commit("removeMediaFile", {
                user: this.user,
                index: index,
            });
        },
        addCaptionToFile(e) {
            this.$store.commit("addCaptionToFile", {
                user: this.user,
                index: this.previewIndex,
                text: e.target.value,
            });
            //console.log()
        },
        send(){
            this.files.forEach(file => {
                this.$emit("send",this.text,file);
            });
        }
    },
    created() {
        const data = this.$store.state.media.find(
            (m) => m._id == this.user._id
        );
        this.thumbs = data.thumbs;
        this.files = data.files;
        console.log(this.thumbs);
    },
};
</script>

<style scoped>
.module-media {
    display: flex;
    flex-direction: column;
    max-height: calc(100%-80px);
    height: calc(100%-80px);
}
.media-header {
    background: #44c4b8;
    height: 50px;
}
.media-main {
    flex: 1;
    text-align: center;
    padding: 20px;
}
.media-preview {
    height: 100%;
}
.media-files {
    height: 200px;
    background: #26a69a;
    display: flex;
}
.additional-images {
    height: 100%;
    width: 100%;
}
.additional-image-box {
    height: 125px;
    width: 125px;
    cursor: pointer;
    background: #44c4b8;
    border: 1px solid #fff;
    margin: 10px;
    background-size: cover !important;
    position: relative;
    transition-duration: 150ms;
}
.additional-image-box:hover {
    box-shadow: inset 0px 9px 20px 5px #2e364a;
    filter: drop-shadow(1px 4px 6px white);
}

.additional-image-box:hover .remove-media-btn {
    display: block;
}

.activePreview {
    filter: drop-shadow(1px 4px 6px white);
}
.right-col {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
}
.left-action {
    display: flex;
    flex: 0.25;
    justify-content: center;
    align-items: center;
}
.send-btn {
    height: 30%;
    width: 30%;
    background-color: #2e364a;
    justify-content: center;
    align-items: center;
}
.remove-media-btn {
    position: absolute;
    right: 0;
    color: #fff;
    display: none;
}
</style>

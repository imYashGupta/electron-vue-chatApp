import auth from "../APIs/auth"
import user from "../APIs/user";
import { eventBus } from "./../main";
export default {
    state:{
        token:"",
        user:{},
        conversations:[],
        conversationWith:null,
        contacts:[],
        media:[],
    },
    getters:{
        isLoggedIn(state){
            return state.token!=null && state.token!="";
        },
        user(state){
            return state.user;
        },
        conversations(state){
            return state.conversations;
        },
        conversationWith(state){
            return state.conversationWith;
        },
        contacts(state){
            return state.contacts;
        },
        media(state){
            return state.media;
        }
    },
    mutations:{
        login(state,payload){
            const {token,user} = payload;
            state.token = token;
            state.user = user;
        },
        home(state,payload){
            state.conversations = payload.conversations;
            state.contacts = payload.contacts;
        },
        logout(state){
            state.token = null;
            state.user = null;
            state.conversations=null;
            state.conversationWith=null;
            state.contacts=null;
            console.log("logout on state",state.token);
        },
        conversationWith(state,user){
            state.conversationWith = user;
        },
        addMessage(state,{user,message}){
            const index= state.conversations.findIndex(conversation => conversation.id==user._id);
            console.log(index);
            if(index < 0){
                //start new conversation
                const newConversation = {
                    id:user._id,
                    updatedAt: Date.now(),
                    messages:[message],
                    user:user,
                    _id:state.user._id+" and "+user._id
                }
                state.conversations.unshift(newConversation);
                eventBus.$emit("added",{new:true});
                //state.conversations = [newConversation,...state.conversations]
            }else{
                //push to existing conversation

                state.conversations[index].messages.push(message);
                const moveToTop = (arr, fromIndex, toIndex) => {
                    var element = arr[fromIndex];
                    arr.splice(fromIndex, 1);
                    arr.splice(toIndex, 0, element);
                    return arr;
                }
                const moved=moveToTop(state.conversations,index,0);
                state.conversations=moved;
                eventBus.$emit("added",{new:false,index:index});
            }
        },
        updateMessageStatus(state,{user,message,status}){
            const index= state.conversations.findIndex(conversation => conversation.id==user._id);
            const messageIndex=state.conversations[index].messages.findIndex(msg => msg._id==message._id);
            const msg=state.conversations[index].messages[messageIndex];
            msg.status = status;

        },
        updateProfile(state,user){
            state.user = user;
        },
        addMedia(state,data){
            state.media.push(data);
            console.log("media added");
        },
        removeMedia(state,user){
            const index=state.media.findIndex(m => m._id==user._id);
            state.media.splice(index,1);
        },
        removeMediaFile(state,{user,index}){
            const filesIndex=state.media.findIndex(m => m._id==user._id);
            if( state.media[filesIndex].files.length == 1 ){
                state.media.splice(filesIndex);
            }
            else{
                state.media[filesIndex].files.splice(index,1);
            }
        },
        addCaptionToFile(state,{user,index,text}){
            const filesIndex=state.media.findIndex(m => m._id==user._id);
            state.media[filesIndex].files[index].caption = text;
            console.log(state);
        }
    },
    actions:{
        login(context,payload){
            return new Promise((resolve,reject) => {
                auth.login(payload,(response) => {
                    context.commit('login',response.data);
                    resolve(response);
                },((error) => {
                    reject(error);
                }))            
            })
        },
        register(context,payload){
            //payload is user info here
            return new Promise((resolve,reject) => {
                auth.register(payload,(response) => resolve(response) ,(error) => reject(error));
            })
        },
        authenticate(context,token){
            return new Promise((resolve,reject) => {
                auth.authenticate(token,(response) => {
                    const token = localStorage.getItem("__token");
                    context.commit("login",{user:response.data.user,token:token});
                    resolve(response);
                },(error => {
                    reject(error);
                }))            
            })
        },
        logout(context){
            localStorage.removeItem('__token');
            localStorage.removeItem('__user');
            return context.commit("logout");
        },
        homeData(context){
            return new Promise((resolve,reject) => {
                user.home((response) => {
                    context.commit("home",response.data);
                    resolve(response);
                },(error) => {
                    reject(error);
                })
            })    
        },
        sendMessage(context,payload){
            return new Promise((resolve,reject) => {
               //context.commit("addMessage",payload);
                user.homes(payload,(response) => {
                    resolve(response);
                    context.commit("updateMessageStatus",{...payload,status:true});
                },(error) => {
                    context.commit("updateMessageStatus",{...payload,status:false});
                    reject(error);
                })
            }) 
        }
    }
}
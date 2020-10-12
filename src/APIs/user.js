import Axios from "axios";
if(localStorage.getItem("__token")!=null){
    Axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem("__token");
}
const addHeader = () => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem("__token");
};
export default {
    home(success,error){
        addHeader();
        Axios.get("chat/home").then(response => success(response)).catch(err => error(err));
    },
    /* send(payload,success,error){
        Axios.post("chat/send",{
            text:payload.text,
            to:payload.to
        }).then(response => success(response)).catch(err => error(err));
    } */
    homes({text,to,file},success,error){
        let formData = new FormData();
        if(text!=undefined){
            formData.append("text",text);
        }
        formData.append("to",to);
        if(file){
            formData.append("attachment",file);
        }
        Axios.post("chat/send",formData,{
            headers:{
                'Content-Type' : 'multipart/form-data'
            }
        }).then(response => success(response)).catch(err => error(err));
    },
    getUser({id},success,error){
        Axios.post("user/get",{
            id:id
        }).then(response => success(response))
        .catch(err => error(err));
    }
}
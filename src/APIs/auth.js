import Axios from "axios"
/* if(localStorage.getItem("__token")!=''){
    Axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem("__token");
} */
export default{
    login(credentials,success,error){
        const {email,password} = credentials;
        Axios.post("auth/login",{
            email:email,
            password:password
        }).then(response => success(response))
        .catch(err => error(err));
    },
    authenticate(token,success,error){
        Axios.post("auth/authenticate",{},{
            headers:{
                "Authorization":"Bearer "+token
            }
        }).then(response => success(response))
        .catch(err => error(err));
    },
    register(userData,success,error){
        Axios.put("auth/register",userData)
        .then(response => success(response))
        .catch(err => error(err))
    }
}
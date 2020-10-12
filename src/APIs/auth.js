import Axios from "axios"
Axios.defaults.headers.common['Authorization'] = undefined;
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
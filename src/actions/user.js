import * as types from './../constants/ActionType';
import CallApi from '../helper/axiosClient'

export const getApiUser = ()=>dispatch=>{
    CallApi({
        url : "http://localhost:8080/api/auth/user",
        method : "get"
    })
    .then(data=>{
        if(data&&data.statusCode==200){
            dispatch(getUser(data));
        }
        else{
            localStorage.removeItem("Authorization");
            dispatch(logOutUser());
        }
    })
}
export const getUser = (data)=>{
    return {
        type : types.GET_USER,
        data,
    }
}
export const logOutUser = ()=>{
    return {
        type : types.LOGOUT_USER
    }
}
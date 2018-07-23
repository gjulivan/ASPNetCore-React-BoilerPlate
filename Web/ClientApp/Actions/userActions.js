import UserAPI from '../APIRequest/user';
import { push } from 'react-router-redux'

export const authSuccess =  (payload) => ({
  type: 'AUTH_SUCCESS', payload
})

export const authFail = () => ({
  type: 'AUTH_FAIL'
})

export function login(param){
  return (dispatch) => {
      return UserAPI.login(param).then((result=>{
         if(result.status == 200){
           if (result.data.token){
               localStorage.setItem("loginInfo", JSON.stringify(result.data));
               dispatch(authSuccess(result.data));
               return true;
             }
         } else {
           return false;
         }
        })).catch((err)=> {
         return false;
        });
    };
}

export function register(param){
  return (dispatch) => {
      return UserAPI.register(param).then((result=>{
         if(result.status == 200){
           if (result.data.token){
               localStorage.setItem("loginInfo", JSON.stringify(result.data));
               dispatch(authSuccess(result.data));
               return true;
             } else {
               if(result.data.errorMessage){
                 return result.data;
               }
             }
         } else {
           return false;
         }
        })).catch((err)=> {
         return false;
        });
    };
}

export function validateAuth(){
  return (dispatch) => {
        const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
        if(loginInfo && loginInfo.token){
          return UserAPI.validateAuth(loginInfo.token).then((result)=>{
            if (result.status == 200 && result.data.result.toLowerCase() === "authsuccess") {
              dispatch(authSuccess(loginInfo));
              return true;
            } else {
               return false;
            }
          }).catch((err)=>{
            console.err(err);
            return false;
          });
        } else{
          return new Promise((resolve, reject)=>{
            resolve(false);
          })
        }
    };
}

export function logout(){
  return (dispatch) => {
      localStorage.removeItem("loginInfo");
      dispatch(authFail());
      dispatch(push('/login'));
    };
}

export function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

export function validatePasswordStrength(password) {
    var re = /(?=^.{6,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    return re.test(password);
}

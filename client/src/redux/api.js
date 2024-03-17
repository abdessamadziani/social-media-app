import axios from "axios";
import {loginStart,loginSuccess,loginError} from "./userSlice"

export const login = async(dispatch,user) =>{
    dispatch(loginStart())
    try{
        const res= await  axios.post('http://localhost:5000/api/users/signin', user, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          })
          dispatch(loginSuccess(res.data))
              console.log(' this is the res before create local storage',res);
              localStorage.setItem('jwt_token',JSON.stringify(res.data));
              console.log(' this is the res.data after creat local storage',res.data);
      }catch(error)
        {
            dispatch(loginError())
        }

}
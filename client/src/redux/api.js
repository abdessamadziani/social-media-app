import axios from "axios";
import {loginStart,loginSuccess,loginError,editStart,editSuccess,editError} from "./userSlice"



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
              console.log("login test::::::",res.data)
              console.log(' this is the res.data after creat local storage',res.data);
      }catch(error)
        {
            dispatch(loginError())
        }

}



export const editUserProfileWithImage = async(dispatch,userId,username,fullname,url,accessToken) =>{
  dispatch(editStart())
  try{
          
              


                  axios.put(`http://localhost:5000/api/users/edit/user/${userId}`, {
                    username,
                    fullname,
                    avatar: url
                }, {
                    headers: {
                        'Content-Type': 'application/JSON',
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
                .then(response => {
                    // Handle response
                    console.log("edit profile test::::::",response.data)
                    dispatch(editSuccess(response.data))
                    localStorage.setItem('jwt_token',JSON.stringify(res.data));


                })
                .catch(error => {
                    // Handle error
                });
                
            console.log(' this is the res.data after creat local storage new one',response.data);
    }catch(error)
      {
          dispatch(editError())
      }

}



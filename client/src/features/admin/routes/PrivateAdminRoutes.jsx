import {Outlet, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../helpers';
import { useSelector } from "react-redux"

export const PrivateAdminRoutes = () => {
    const { user } = useSelector((state) => state.theUser);


  let auth=isAuthenticated()

     return (

        (auth && user.user.role === 'admin' )? <Outlet/> : <Navigate to="auth/signin" />

          )



}
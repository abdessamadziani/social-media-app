import {Outlet, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../helpers';

export const PrivateRoutes = () => {
  let auth=isAuthenticated()

     return (

        auth ? <Outlet/> : <Navigate to="auth/signin" />

          )



}

import { useState } from 'react'
import './App.css'
import { Route, Routes } from "react-router";
import  RootLayout  from "../src/shared/layouts/RootLayout";
// import { NotFoundPage } from "./shared/pages";
import AuthRoutes from "./features/auth/routes/AuthRoutes";
// import HomeRoutes from "./features/home/routes/HomeRoutes";
// import MailRoutes from "./features/mail/routes/MailRoutes";
// import { AuthMiddleware } from "./features/auth/middlewares";

// import MenuRoutes from "./features/menu/routes/menuRoutes";
// import {LandingPage} from "./shared/pages/LandingPage"
import  SignIn  from './features/auth/components/SignIn';
// import AdminRoutes from "./features/adminDashboard/routes/AdminRoutes";
import { PrivateRoutes } from './features/auth/routes/PrivateRoutes';
import HomeRoutes from './features/home/routes/HomeRoutes'
// import { isAuthenticated } from './features/auth/helpers';


function App() {

  return (
    <>
      <Routes>
          <Route path="/" element={<RootLayout />}>
          {/* <Route index  element={<LandingPage/>} /> */}
          <Route index  element={<SignIn/>} />
          <Route  path="/auth/*" element={<AuthRoutes />} />

          <Route  element={<PrivateRoutes/>}>
              <Route  path="/home/*" element={<HomeRoutes />} />
          </Route>
          {/* <Route  path="/home/*" element={<HomeRoutes />} /> */}
          {/* <Route  path={auth ?"/home/*" : "/auth/*" } element={auth ? <HomeRoutes/> : <AuthRoutes/> } /> */}

          
        </Route>
    </Routes>
    </>
  )
}

export default App

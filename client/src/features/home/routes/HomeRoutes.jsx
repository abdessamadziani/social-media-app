import { Route, Routes } from "react-router";
import {Profile , HomePage } from "../components/index";
 import HomeLayout from "../layouts/HomeLayout";
import Settings from "../components/profileSettings/Settings";
// import AdminDashboard from "../../admin/AdminDashboard";





const HomeRoutes = () => (
  <Routes>
      <Route path="/" element={<HomeLayout />} >
            <Route index element={<HomePage />} />
            <Route path="profile/:id" element={<Profile />} />
            <Route path="setting" element={<Settings />} />
            {/* <Route path="/admin" element={<AdminDashboard />} /> */}

     </Route>
  </Routes>
);

export default HomeRoutes;

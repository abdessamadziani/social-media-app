import { Route, Routes } from "react-router";
import {Profile , HomePage } from "../components/index";
 import HomeLayout from "../layouts/HomeLayout";





const HomeRoutes = () => (
  <Routes>
      <Route path="/" element={<HomeLayout />} >
            <Route index element={<HomePage />} />
            <Route path="profile" element={<Profile />} />
     </Route>
  </Routes>
);

export default HomeRoutes;

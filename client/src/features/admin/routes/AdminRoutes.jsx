import { Route, Routes } from "react-router";
import AdminDashboard from "../components/AdminDashboard";
 import HomeLayout from "../layouts/HomeLayout";
// import Settings from "../components/profileSettings/Settings";
// import AdminDashboard from "../../admin/components/AdminDashboard";





const HomeRoutes = () => (
  <Routes>
      <Route path="/" element={<HomeLayout />} >
            <Route index element={<AdminDashboard />} />
            {/* <Route path="profile/:id" element={<Profile />} />
            <Route path="setting" element={<Settings />} />
            <Route path="/admin" element={<AdminDashboard />} /> */}
     </Route>
  </Routes>
);

export default HomeRoutes;

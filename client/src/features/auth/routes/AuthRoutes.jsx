import { Route, Routes } from "react-router";
 import AuthLayout from "../layouts/AuthLayout";
import { SignIn , SignUp,ActiveMe,ForgetPassword,ForgetPasswordConfirmation} from "../components/index";





const AuthRoutes = () => (
  <Routes>
      <Route path="/" element={<AuthLayout />}    >
      <Route index element={<SignIn />} />
      <Route  path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="forgetpassword" element={<ForgetPassword />} />
      <Route path="/forget-password-confirmation/:token" element={<ForgetPasswordConfirmation />} />
       <Route path="activate-email/:token" element={<ActiveMe />} /> 
      </Route>
  </Routes>
);

export default AuthRoutes;

import { Outlet, useNavigate } from "react-router-dom";


const AuthLayout = () => {
  const navigate = useNavigate();


  const navigateTo = (key) => {
    setSelected(key);
    navigate(`/auth/${key}`);
  };

  return (
    
           <Outlet />
     
     

  );
};

export default AuthLayout;

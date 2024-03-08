import { Outlet, useNavigate } from "react-router-dom";


const HomeLayout = () => {
  const navigate = useNavigate();

  const navigateTo = (key) => {
    setSelected(key);
    navigate(`/home/${key}`);
  };

  return (
    
           <Outlet />
  );
};

export default HomeLayout;

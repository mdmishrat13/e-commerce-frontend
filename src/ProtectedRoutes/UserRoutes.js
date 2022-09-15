import React from "react";
import { Navigate } from "react-router";
import useAuth from "../Componants/Hooks/useAuth";
import { BeatLoader } from "react-spinners";


const UserRoutes = ({ children }) => {
  const { user, isLoading } = useAuth();
  console.log('consoling user route',user)
  if(isLoading){
    return <div className="loader"><BeatLoader color="#36d7b7" size={50} /></div>
  }
  if (user?.email) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default UserRoutes;

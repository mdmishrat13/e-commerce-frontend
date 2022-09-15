import React from "react";
import { Navigate } from "react-router";
import useAuth from "../Componants/Hooks/useAuth";
import { ClipLoader } from "react-spinners";


const GuestRoutes = ({ children }) => {
  const { user, isLoading } = useAuth();
  if(isLoading){
    return <div className="loader"><ClipLoader color="#36d7b7" size={50} /></div>
  }
  if (user.email) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default GuestRoutes;

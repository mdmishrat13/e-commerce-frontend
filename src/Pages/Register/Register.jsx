import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import useAuth from './../../Componants/Hooks/useAuth'
import axios from "axios";

const Register = () => {
  const {emailRegister, googleLogin,isLoading,authError} = useAuth()
  const [registerData, setRegisterData] = useState({});
  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const allRegisterData = { ...registerData };
    allRegisterData[field] = value;
    setRegisterData(allRegisterData);
  };
  const handleSubmit =(e)=>{
    e.preventDefault()
    axios.post('https://e-commerce-server.vercel.app/user',registerData)
    .then(res=>{})
    emailRegister(registerData.email,registerData.password,registerData.displayName)
  }

  return (
    <section className="register__container">
      <form onSubmit={handleSubmit} className="register__form" action="#">
        <h3 className="text-center">Register Here</h3>
        <div className="register__input-group">
          <label htmlFor="displayName">Enter Name</label>
          <input name="displayName" onChange={handleOnChange} id="displayName" type="text" />
        </div>
        <div className="register__input-group">
          <label htmlFor="email">Enter Email</label>
          <input
            name="email"
            onChange={handleOnChange}
            id="email"
            type="email"
          />
        </div>
        <div className="register__input-group">
          <label htmlFor="password">Enter Password</label>
          <input
            name="password"
            onChange={handleOnChange}
            id="password"
            type="password"
          />
        </div>
        <div className="buttons">
          <button type="submit" className="btn-primary"> {isLoading?' Wait...':'Register'}  </button>
        </div>
        <div className="forgot__link text-right">
          <Link to="/login">
            <p>Already have an Account?</p>
          </Link>
        </div>
      </form>
      {authError&&<h4 style={{color:'red',marginTop:'1rem'}}>{authError}</h4>}
      <p className="text-center quick__login-text"> or </p>
      <div className="quick__login">
        <button onClick={googleLogin} className="btn-primary"> Login With Google </button>
        <button className="btn-primary"> Login With Facebook </button>
      </div>
    </section>
  );
};

export default Register;

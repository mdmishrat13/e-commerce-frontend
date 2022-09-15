import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../Componants/Hooks/useAuth";
import "./login.css";

const Login = () => {
  const {emailLogin,googleLogin,authError,isLoading}= useAuth()


  const [loginData,setLoginData]= useState({})



  const handleOnChange = (e)=>{
    const field = e.target.name;
    const value = e.target.value;
    const allLoginData = {...loginData};
    allLoginData[field] = value;
    setLoginData(allLoginData)
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    emailLogin(loginData.email,loginData.password)
  }
  return (
    <section className="login__container">
      <form onSubmit={handleSubmit} className="login__form">
        <h3 className="text-center">Login Here</h3>
      <div className="login__input-group">
        <label htmlFor='email'>Enter Email</label>
        <input name="email" onChange={handleOnChange} id='email' type='email' />
      </div>
      <div className="login__input-group">
        <label htmlFor='password'>Enter Password</label>
        <input name="password" onChange={handleOnChange} id='password' type='password' />
      </div>
      <div className="buttons">
      <button type="submit" className="btn-primary"> {isLoading?' Wait...':'Login Now'}  </button>
      </div>
      <div className="forgot__link text-right">
        <Link to='/register'>Dont have account?</Link>
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

export default Login;

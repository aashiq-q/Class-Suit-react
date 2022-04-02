import React from "react";
import { useNavigate } from 'react-router-dom'
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";

const Login = () => {
  document.title = "Class-Suit | Authentication"
  const { googleSignIn } = useUserAuth();
  const navigate = useNavigate();
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
        navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <GoogleButton onClick={handleGoogleSignIn} />
      </div>
    </>
  );
};

export default Login;

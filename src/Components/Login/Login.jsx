import React from "react";
import "../Login/login.css";
import { auth, provider } from "../../config/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import GoogleButton from "react-google-button";

function Login() {
  
  const gsignin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  //Google Signin

  //   const signIn = async () => {
  //     try{
  //         await signInWithPopup( auth, provider);
  //     }catch(err){
  //         console.log(err);
  //     }
  // }

  return (
    <div className="container_login">
      <div className="login_card">
        <h1 id="s1">
          Welcome to Student <span id="hub0">Hub</span>
        </h1>
        <p id="s2">Sign in to continue</p>
        <div className="signin_btn">
          <button onClick={gsignin}>
            <GoogleButton />
            {/* <span> */}
            {/* Continue with <span id="google">Google</span> */}
            {/* </span> */}
          </button>
        </div>
        <div className="footer">
          <h3 id="s3">An Advanced Student Information System</h3>
        </div>
      </div>
    </div>
  );
}

export default Login;

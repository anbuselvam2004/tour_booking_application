import React, { useState } from 'react';
import {auth,googleProvider} from"../config/firebase";
import {signInWithEmailAndPassword,signInWithPopup} from 'firebase/auth';
import img2 from './gl.png';
import { Link ,useNavigate} from 'react-router-dom';
import '../Signup.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export function Auth  ({child}){
    
    let pat,pat2,path1,path2;
    if(child ==="user"){
         pat='/user-page';
          pat2=`${pat}`;

          path1='/userSignup';
          path2=`${path1}`;
    }
    else{
        pat='/admin-page';
        pat2=`${pat}`;

        path1='/adminSignup';
        path2=`${path1}`
    }
    const history=useNavigate();

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    console.log(auth?.currentUser?.email);


    const signInWithGoogle2= async() =>{
        try{
            await signInWithPopup(auth,googleProvider);
            history(pat2);
           }
           catch(error){
            console.error(error);
           } 
    }
    const signIn = async (e) =>{
        e.preventDefault();
       try{
        const w=await signInWithEmailAndPassword(auth,email,password);
        window.alert("Your account has been Logged In Sucessfully!!!");
        console.log(w.user.email);
        history(pat2);
       }
       catch(error){
        window.alert('check your email');
        console.error(error);
       }
    }
   
 
    return (
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
          <div className="row w-100 d-flex justify-content-center align-items-center">
            {/* Left Section - Form */}
            <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center p-4 bg-white rounded shadow">
              <h1 className="mb-4">LOGIN/SIGNUP</h1>
              <img
                src="https://i.pinimg.com/236x/57/00/c0/5700c04197ee9a4372a35ef16eb78f4e.jpg"
                alt="prof"
                className="rounded-circle mb-4"
                style={{ width: '100px', height: '100px' }}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control mb-3"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control mb-3"
              />
              <button onClick={signIn} className="btn btn-primary w-100 mb-3">
                Sign in
              </button>
              <p>
                Don't have an account?{' '}
                <Link to={path2} className="text-primary">
                  Sign Up
                </Link>
              </p>
              <button
                onClick={signInWithGoogle2}
                className="btn btn-outline-dark d-flex align-items-center justify-content-center w-100 mt-3"
              >
                <img src={img2} alt="googlelogo" className="me-2" style={{ width: '20px' }} />
                Continue with Google
              </button>
            </div>
            {/* Right Section - Image */}
           
          </div>
        </div>
      );
   
 
}
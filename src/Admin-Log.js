import React, { useState } from "react";
import { Auth } from "./components/auth";
import './Signup.css';
import { useNavigate } from "react-router-dom";
import { auth,db } from "./config/firebase";
import {collection,addDoc} from 'firebase/firestore';
import { createUserWithEmailAndPassword } from "firebase/auth";



export function Admin(){
    const log_as_admin='admin';
    return(
        <div>
            <Auth child={log_as_admin}/>
        </div>
    );
}

 export function AdminSignInWithPopup({child}){
    const history=useNavigate();

    const dbpath=`${child}`;
    let pathurl,pathurl1;
    if(child==='userdetail01'){
        pathurl='/user-logged-page';
        pathurl1=`${pathurl}`;
    }
    else{
         pathurl='/Admin-logged-page';
        pathurl1=`${pathurl}`;
    }
        const [username,setUserName]=useState("");
        const [usernum,setUserNum]=useState("");
        const [userEmail,setEmail]=useState("");
        const [userpassword,setPassword]=useState("");

        const dataCollection=collection(db,dbpath);

        const onSignUpAdmin=async()=>{
            try{
            await addDoc(dataCollection,{
                name:username,
                number:usernum,
                email:userEmail,
                password:userpassword,
            })
            
        }
        catch(error){
            console.error(error);
        }
        }
        const SignUp = async(e)=>{
            e.preventDefault();

            try{
                await createUserWithEmailAndPassword(auth,userEmail,userpassword);
                onSignUpAdmin();
               history(pathurl1);
                window.alert("Sucessfully created");
            }
            catch(error){
                console.log(error);
                window.alert("check mail")
            }
        }

        return (
            <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
              <div className="row w-100">
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
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setUserName(e.target.value)}
                    className="form-control mb-3"
                  />
                  <input
                    type="number"
                    placeholder="Mobile Number"
                    onChange={(e) => setUserNum(e.target.value)}
                    className="form-control mb-3"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control mb-3"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control mb-3"
                  />
                  <button onClick={SignUp} className="btn btn-primary w-100 mb-3">
                    Sign Up
                  </button>
                </div>
                {/* Right Section - Image */}
                <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center p-0">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/fir-login-b5b81.appspot.com/o/uploads%2FTravel%20Tips_%20Where%20Should%20I%20Go%20on%20Vacation%20_!.jpg?alt=media&token=3f10aacf-939b-42c2-90fb-bf9f5eef34b9"
                    alt="img-log"
                    className="img-fluid rounded"
                    style={{ maxHeight: '70%', maxWidth: '80%' }}
                  />
                </div>
              </div>
            </div>
          );
  }
//testing
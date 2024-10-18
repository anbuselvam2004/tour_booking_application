import React, { useEffect, useState } from 'react';
import './Signup.css';
import{Auth} from'./components/auth';
import {db} from './config/firebase';
import {getDocs,collection,addDoc} from 'firebase/firestore';

function Login() {
  const [movielist,setMovielist]=useState([]);

  const[newUserName,setUserName]=useState("");
  const[newUserEmail,setUserEmail]=useState("");
  const[newUserNumber,setUserNumber]=useState(0);


  const moviesCollection=collection(db,"userdetail01");


  const getMovielist = async () =>{
    try{
    const data=await getDocs(moviesCollection);
    
    const filter=data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setMovielist(filter);
    }
    catch(error){
      console.error(error);
    }
  };


 useEffect(() =>{
  
  getMovielist();
 },   );


 const onSubmitUser= async()=>{
  try{
  await addDoc(moviesCollection,{
    Name:newUserName,
    email:newUserEmail,
    mobile:newUserNumber,
  })
  getMovielist();
  window.alert("sucessful")
 }
 catch(error){
  console.error(error);
 }
}

  return (
    <div className="App">
     <Auth/>

     <div>
      <input placeholder='Name...' type='text' onChange={(e)=>setUserName(e.target.value)}></input>
      <input placeholder='Email Id...' type='email' onChange={(e)=>setUserEmail(e.target.value)}></input>
      <input placeholder='Mobile Number...' type='number' onChange={(e)=>setUserNumber(e.target.value)}></input>
      <button onClick={onSubmitUser}>Submit</button>
     </div>
     <div>
      {movielist.map((userdetail01) =>(
        <div>
          <h1>{userdetail01.Name}</h1>
          <p>email:{userdetail01.email}</p>
          <p>number: {userdetail01.mobile}</p>
        
        
        </div> 
       ) ) }
     </div>
    
         
    </div>
  );
}

export default Login;

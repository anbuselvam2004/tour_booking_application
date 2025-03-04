import React, { useEffect,useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'jquery/dist/jquery.min.js';
import '@popperjs/core/dist/umd/popper.min.js';
import { db ,auth} from './config/firebase';
import {   doc,getDoc,setDoc,updateDoc,arrayUnion } from 'firebase/firestore';
import {   useNavigate, useParams } from 'react-router-dom';

import Nav from './nav1';
import Footer from './footall';

import './busdetail.css';
import Gallery from './albums';


function Details() {


    const Navigate=useNavigate();
    const [bool,setbool]=useState(false);
    const {id}=useParams();
    console.log(bool)
    // const id1='aByMXaZdXukfZQV6fNZO';
    const [busData,setBusData]=useState([]);

    useEffect(() =>{
        const fetchDetails = async ()=>{
            try{
                const coll=doc(db,"ImageUrl",id);
                const doc2=await getDoc(coll);
                if(doc2.exists()){
                   
                    setBusData(doc2.data());
                }
                else{
                    console.log("No such document");
                }
            }
            catch(error){
                console.log(error);
            }
        }
        fetchDetails();
    },[id]);


   
    if(!busData){
        return <div className='Loading'>Loading...</div>
    }

    


    const AddFav=async()=>{       
        const dat=auth.currentUser;
        
        
        if(dat){
           
            try{
            const ref=doc(db,'favourites',dat.uid);
            await updateDoc(ref,{
                imgid:arrayUnion(id)
            }).catch(async(error)=>{
                if(error.code==='not-found'){
                    await setDoc(ref,{imgid: [id]})
                }
                else{
                    console.error(error);
                }
            })
          
            window.alert("Added sucessfully");
        }
        catch(error){
            console.error(error);
        }
        }
        else{
            window.alert("Please Login or Sign Up");
           
        }
       
    }

   
   

    const AddBook=()=>{

        const dat=auth.currentUser;
        
        if(!dat){
            setbool(false);
            Navigate('/Login-SignUp');
            window.alert("Please Login");
            return;
           
           
        }

        console.log(dat.email);
         setbool(true);
         Navigate(`/BookBus/${id}`);



   
    }


   
    return (
        <div>
             <Nav />
            {/* Main Content */}
            <div className="Main container-fluid bg-dark" >
                <div className="container bg-transparent border-0">
                    <div className="row align-items-center">
                        {/* Card Section */}
                        <div className="col-md-4 mb-4  bus-card" >
                            <div className="card mt-3">
                                <img src={busData.url} alt="bus1" className="card-img-top" />
                                
                            </div>
                        </div>

                        {/* Bus Info Section */}
                        <div className="col-md-6 m bus-info">
                            <div className="card-body text-start ">
                            <h2 className="bus-name"><strong>{busData.busname}</strong></h2>
                                 <h3 className="bus-detail">Bus Name: {busData.busname}</h3>
                                  <h3 className="bus-detail">Bus Registration Number: {busData.busnumber}</h3>
                                 <h3 className="bus-detail">Coach: {busData.coach}</h3>
                                 <h3 className="bus-detail">Number of Seats: {busData.Seats}</h3>
                                 <h3 className="bus-owner">Owner Name: {busData.ownername}</h3>
                                 <h3 className="bus-contact">Contact: {busData.contact}</h3>
                                 <div className="d-flex gap-2">
                                <button onClick={AddBook} className="mb-2 btn btn-danger">Book now</button>
                               <button onClick={AddFav} className="mb-2  btn btn-outline-danger">Add to Favourite</button>
                               </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Photo Swiper Section */}
                        <div >
                            <Gallery child={id} />
                        </div>
            <Footer />
        </div>
    );
}

export default Details;

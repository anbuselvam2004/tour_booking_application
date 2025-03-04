import React,{  useState,useEffect} from'react';
import { db ,auth} from './config/firebase';
import {   doc,getDoc,setDoc,updateDoc,arrayUnion } from 'firebase/firestore';
import {   useNavigate, useParams } from 'react-router-dom';
import Nav from './nav1';
import './Signup1.css';
import Footer from './footall';
// import Booking from './BookingDetails';


// const bool=true;

export function BookNow(){
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
        console.log(dat.email);
        
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
        console.log(dat);
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


   
   
   
    
    return(
        
        <div>
            <Nav /*nchild={bool}*/ />

        <div className="container-fluid bg-light">
                <div className="container">
                <div className="row align-items-center">
                        <div className="col-md-4 mb-4 mt-3 bus-card">
                            <div className="card">
                                <img src={busData.url} alt="bus1" ></img>  
                                    <div className="card-body">
                                        <h2 className="bus-name"><strong>{busData.busname}</strong></h2>                  
                                    </div>
                            </div> 
                        </div>
                          {/* Bus Info Section */}
                        <div className="col-md-6 ms-md-5 ps-md-5 bus-info"> {/* Added margin-start (ms-md-5) and padding-start (ps-md-4) */}
                            <div className="text-black mb-4">
                                <h1 className="mb-4 mt-5" style={{color:'green'}}>BUS NAME {busData.busname}</h1> 
                                <h3 className=" mb-2">BUS NUMBER:{busData.busnumber}</h3> 
                                <h3 className="mb-2">SEATER:{busData.Seats}</h3> 
                                <h3 className="mb-2"> BUS TYPE:{busData.coach}</h3>
                                <h3 className="mb-2">OWNER NAME: {busData.ownername}</h3>
                                <h3 className="mb-2">CONTACT:{busData.contact}</h3> 
                                
                            </div>
                            <div className="d-flex gap-3">
                            <button className="btn btn-success" onClick={AddFav} >Add to favourite</button> 
                        <button className="btn btn-success" onClick={AddBook}>BOOK NOW</button>
                            </div>
                            <p className="text-white">Loading bus information...</p>
                        </div>
                </div>
                </div>
            </div>
    
           <Footer/>

        </div>
    )
}
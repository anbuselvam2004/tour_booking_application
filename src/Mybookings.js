import React, { useEffect, useState } from "react";
import { auth, db } from "./config/firebase";
import { getDoc ,doc,collection, query, where, getDocs } from "firebase/firestore";
import Nav from "./nav1";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import Footer from "./footall";
import './mybookins.css';


export function Mybookings(){
    const hist =useNavigate();
    const [currdoc,setcurrdoc]=useState('');

    const [busDataList, setBusDataList] = useState([]);
  const [loading, setLoading] = useState(true);

    const fetchBusData=async(userEmail)=>{
        try {
            console.log(userEmail);
            const busCollectionRef = collection(db, 'Bookings');  // Your Firestore collection
            const q = query(busCollectionRef, where('mybooking', 'array-contains', userEmail));
            const querySnapshot = await getDocs(q);
           
            let userBusDetails = [];
            console.log("Entery");
            querySnapshot.forEach((doc) => {
              // Get the array and filter for matching email
              const busDetailsArray = doc.data().mybooking;
            
              console.log("hello");
              const matchingBuses = busDetailsArray.filter((bus) => bus.email === userEmail);
              userBusDetails = [...userBusDetails, ...matchingBuses]; // Collect matching buses
            });
            
            console.log(userBusDetails);
            setBusDataList(userBusDetails);
          } catch (error) {
            console.error('Error fetching bus data:', error);
          } finally {
            setLoading(false);
          }
    }
    useEffect(()=>{

        const status=async()=>{
        const dat=auth.currentUser;
        if(!dat){
            
            hist('/Login-SignUp');
            
        
        }
        else{
            const bookdoc=doc(db,'Bookingstatus',dat.email);
            const infdoc=await getDoc(bookdoc);
            
            const userEmail = dat.email; // Logged-in user's email
            fetchBusData(userEmail);
            if(!(infdoc.exists)){
                return(
                    <div>
                        No Bookings
                    </div>
                )
            }
            setcurrdoc(infdoc.data());

        }
    }

    status();
    },[])


    return (
        <div>
            <Nav/>
            <div className="container-fluid booking-status-page d-flex align-items-center justify-content-center">
            <div className="status-content text-center">
                            <h1 className="card-title status-text">{currdoc.stat}</h1>
                            </div>
                            </div>
        <Footer/>
        </div>
    );
}
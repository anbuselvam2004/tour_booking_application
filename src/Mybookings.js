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
    console.log(busDataList)
    console.log(loading)
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
    },[hist]);


    return (
        
            <div>
                <Nav />
                <div className="container-fluid booking-status-page d-flex align-items-center justify-content-center">
                    <div className="status-content text-center">
                        <h1 className="card-title status-text">{currdoc.stat}</h1>
                    </div>
                </div>
        
                {/* Display booking details */}
                <div className="container mt-4">
                    {loading ? (
                        <p>Loading your bookings...</p>
                    ) : busDataList.length === 0 ? (
                        <p>No bookings found.</p>
                    ) : (
                        <div className="row">
                            {busDataList.map((bus, index) => ( 
                                <div key={index} className="col-md-4 mb-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">{bus.busName}</h5>
                                            <p className="card-text">Bus Number: {bus.busNumber}</p>
                                            <p className="card-text">Seats: {bus.seats}</p>
                                            <p className="card-text">Type: {bus.isAC ? "AC" : "Non-AC"}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
        
                <Footer />
            </div>
        );
        
    
}
import React, { useState,useEffect,useRef } from "react";
import Nav from "./nav1"; 
// import Footer from './footall';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'jquery/dist/jquery.min.js';
import '@popperjs/core/dist/umd/popper.min.js';


import logo from './images/bl.png';
import busView from './images/download (5).jpeg';
import { auth, db } from "./config/firebase";
import {  arrayUnion, doc,getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useParams,useNavigate } from "react-router-dom";
import axios from 'axios';
import emailjs from '@emailjs/browser';
import Footer from "./footall";


export default function Booking() {
   
   const hist=useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    
    const [emailid,setemailid]=useState("");
    const [ownname,setownname]=useState("");
   



    const {id}=useParams();
    const [name,setname]=useState("");
    const [email,setemail]=useState("");
    const [type1,settype]=useState("");
    const [start1,setstart]=useState("");
    const [end1,setend]=useState("");
    const [startdays,setstartdays]=useState("");
    const [enddays,setenddays]=useState("");

    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false); // State for checkbox



    const [getid,setgetid]=useState("");

    const form = useRef();

    const sendEmail = (e) => {
    
        emailjs
          .sendForm('service_1povgeb', 'template_ljjm5up', form.current, {
            publicKey: 'WNwgDfufi9SlU2S__',
          })
          .then(
            () => {
              console.log('SUCCESS!');
            },
            (error) => {
              console.log('FAILED...', error.text);
            },
          );
      };

    useEffect(()=>{
        const fetchemail=async()=>{
            const docref=doc(db,'ImageUrl',id);
            const docsnap=await getDoc(docref);
           const admininfo=docsnap.data();
           setemailid(admininfo.email);
            setownname(admininfo.ownername);
            

        }
        fetchemail();
    });

 

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

const BookBus=async()=>{
    const docref=doc(db,'ImageUrl',id);
    const docsnap=await getDoc(docref);
    console.log(docsnap.data());
    const dat=auth.currentUser;
    if(isCheckboxChecked){
    if(dat.email==email){
    if(docsnap.exists()){
        const fieldvalue=docsnap.data().email;
        setgetid(fieldvalue);
        const coll=doc(db,'Bookings',fieldvalue);


        const coll2=await getDoc(coll);

        if(coll2.exists()){
            Booked(coll);
        }
        else{
            await setDoc(coll,{
                mybooking:arrayUnion({
                username:name,
                coachtype:type1,
                startLocation:start1,
                destination:end1,
                startdate:startdays,
                enddate:enddays,
                email:email,
            })
            })
            window.alert("Booked Sucessfully");
        }
        sendEmail();
        hist('/SucessUpload');

    }
}
else{
    window.alert("Please enter the logged in email");
}
    }
  
}

const Booked=async(coll)=>{
    try{
        await updateDoc(coll,{
            mybooking:arrayUnion({
            username:name,
            coachtype:type1,
            startLocation:start1,
            destination:end1,
            startdate:startdays,
            enddate:enddays,
            email:email,
        })
        })
        window.alert("added sucessfully");
        hist('/SucessUpload');
    }
    catch(error){
        console.error(error);
    }
}

    

    const calculateTotalAmount = (start, end) => {
        const oneDay = 24 * 60 * 60 * 1000; // Hours*minutes*seconds*milliseconds
        const startDateObj = new Date(start);
        const endDateObj = new Date(end);
        
        if (startDateObj && endDateObj && endDateObj > startDateObj) {
            const diffDays = Math.round(Math.abs((endDateObj - startDateObj) / oneDay)) + 1; // Adding 1 to include the starting day
            setTotalAmount(diffDays * 7000); // Daily rate of 7000 rupees
        } else {
            setTotalAmount(0); // Reset if the dates are invalid or not selected properly
        }
    };

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
        calculateTotalAmount(event.target.value, endDate);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
        calculateTotalAmount(startDate, event.target.value);
    };





    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    // Replace with your own API key
    const API_KEY ="";//removed api key

    const fetchWeather = async (city1) => {
        try {
            const response = await axios.get(
                `http://api.openweathermap.org/data/2.5/weather?q=${city1}&appid=${API_KEY}&units=metric`
            );
            setWeatherData(response.data);
            setError('');
        } catch (error) {
            setError('Error fetching weather data. Please try again.');
            setWeatherData(null);
        }
    };

    const handleCityChange = (event) => {
        setCity(event.target.value);
        if(city){
            fetchWeather(city); 
        }
        else{
            setWeatherData(null);
            setError('')
        }

        
        
       

    };

   


    return (
        <div>
            <style>
                {`
                .Main-content {
                    background: linear-gradient(to bottom right, #e66465, #9198e5);
                }

                .card {
                    height: 350px; /* General height for larger screens */
                }

                /* Media queries for responsive behavior */
                @media (max-width: 767px) {
                    .first-card {
                        height: 200px !important; /* Reduced height for mobile view */
                    }
                }
                `}
            </style>
           <Nav/>
           
            <div className="Main-content container-fluid  align-items-center justify-content-center" 
                 style={{ minHeight: 'calc(100vh - 60px)', background: 'linear-gradient(to bottom right, #e66465, #9198e5)' }}>
                <div className="container mt-4 bg-transparent ">
                    
                    <div className="col-12 col-md-5 d-flex align-items-center justify-content-center bg-dark">
                            <div className="card bg-succes justify-content-center " style={{ width: '100%', height: '350px', border: 'none', backgroundColor: '#f8f9fa' }}>
                                <div className="card-body d-flex  flex-column p-4" style={{ height: '100%', overflowY: 'auto' }}>
                                    <center><img src={logo} alt="form-logo" height={50} width={50} /></center>
                                    <h4 className="text-center mb-4">BOOK YOUR JOURNEY</h4>
                                    <form className="w-100" ref={form} >
                                        <div className="mb-2">
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <input type="text" className="form-control" id="name" placeholder="Enter your name" name="from_name" onChange={(e)=>{setname(e.target.value)}}/>
                                        </div>
                                        <div className="mb-2">
                                            <label htmlFor="name" className="form-label">Email(used for login)</label>
                                            <input type="email" className="form-control" id="name" placeholder="Enter your mail"  onChange={(e)=>{setemail(e.target.value)}}/>
                                        </div>
                                        <div className="mb-2">
                                            <input type="email" className="form-control hidden d-none" id="name" value={emailid} name="to_mail" />
                                            <input type="name" className="form-control hidden d-none" id="name" value={ownname} name="to_name" />

                                        </div>
                                        <div className="mb-2">
                                            <label htmlFor="type" className="form-label" >Select Type</label>
                                            <select className="form-control" id="type" onChange={(e)=>{settype(e.target.value)}}>
                                                <option value="AC">AC</option>
                                                <option value="Non-AC">Non-AC</option>
                                                <option value="Both">Both</option>
                                            </select>
                                        </div>
                                        <div className="mb-2">
                                            <label htmlFor="pickup" className="form-label" >Pickup Location</label>
                                            <input type="text" className="form-control" id="pickup" name="start"  placeholder="Enter pickup location" onChange={(e)=>{setstart(e.target.value)}} />
                                        </div>
                                        <div className="mb-2">
                                            <label htmlFor="dropoff" className="form-label" >Destination</label>
                                            <input type="text" className="form-control" id="dropoff" placeholder="Enter drop-off location" name="end"  value={city} onChange={(e)=>{handleCityChange(e);   setend(e.target.value); }} />
                                        </div>
                                        <div className="mb-2">
                                            <label htmlFor="start-date" className="form-label">Starting Date</label>
                                            <input type="date" className="form-control" id="start-date" value={startDate} name="stdate" onChange={(e)=>{ setstartdays(e.target.value); handleStartDateChange(e)}} />
                                        </div>
                                        <div className="mb-2">
                                            <label htmlFor="end-date" className="form-label">Ending Date</label>
                                            <input type="date" className="form-control" id="end-date" value={endDate} name="edate" onChange={(e)=>{setenddays(e.target.value); handleEndDateChange(e) }} />
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label">Total Amount:</label>
                                            <p>{totalAmount} Rupees</p>
                                        </div>
                                        <button type="button" className="btn btn-secondary mt-2" onClick={handleShowModal}>
                                            Show Bus View
                                        </button>

                                        <div className="form-check mb-2">
                                                 <input className="form-check-input" type="checkbox" id="confirmCheckbox" onChange={(e) => setIsCheckboxChecked(e.target.checked)} />
                                                 <label className="form-check-label" htmlFor="confirmCheckbox">
                                                 I agree to the terms and conditions
                                                 </label>
                                                 </div>

                                    </form>
                                    <button type="submit" className="btn btn-primary mt-2" style={{color:'black'}} onClick={BookBus}  disabled={!isCheckboxChecked}>CONFIRM</button>

                                </div>

                            </div>
                        </div>
                        {/* First Card */}
                        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Weather App</h1>
            {/* <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={handleCityChange}
                style={{ padding: '10px', width: '200px' }}
            />
            <button onClick={handleSearch} style={{ padding: '10px', marginLeft: '10px' }}>
                Search
            </button> */}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {weatherData && (
                <div style={{ marginTop: '20px' }}>
                    <h2>{weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Weather: {weatherData.weather[0].description}</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                </div>
            )}
        </div>

                        {/* Second Card */}
                        {/* <div className="col-12 col-md-4 d-flex align-items-center justify-content-center mb-0 mb-md-0">
                            <div className="card" style={{ width: '100%', height: '350px', border: 'none', overflow: 'hidden' }}>
                                <img src={image1} alt="Decorative" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </div> */}

                        {/* Third Card - Form */}
                       
                   
                </div>
            </div>

            {/* Modal Component */}
            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="busViewModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="busViewModalLabel">Bus View</h5>
                                <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <img src={busView} alt="Bus View" style={{ width: '100%', height: 'auto' }} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer/>

        </div>
    );
}





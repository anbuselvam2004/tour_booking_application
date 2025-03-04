import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import Footer from './footall';
import Nav from "./NavAdmin";
import busImage from './images/travel (7).jpg'; 
import { auth, db } from "./config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";


export default function Admin()
{
    const hist=useNavigate();

    const [loading,setLoading]=useState(false);
    const [state,setstate]=useState(false);
    const [admin,setadmin]=useState(null);
    console.log(admin)
    const Suggests=async()=>{
        setLoading(true);
        const dat=auth.currentUser;
        const email=dat.email;
        console.log(email);
        try{
            const quer=query(collection(db,"ImageUrl"),where("email","==",email));
            const snap=await getDocs(quer);
            setLoading(false);

            if(snap.empty){
                console.log("Hello");
                hist('/addbus');
            }
            else{
              setstate(true);
              const doc=snap.docs[0];
              setadmin({id:doc.id, ...doc.data()})
            }
        }
        catch(error){
            console.error(error);
        }

    }
    if(state){
       hist('/Upload');
    }
    if(loading){
        return <div>Loading...</div>
    }

    return(
        <div>
            <Nav/>
            <div className="Main">
            <div className="container-fluid  flex-grow-1 py-5 d-flex " style={{ background: 'linear-gradient(to right, #ff7e5f, #feb47b)' }}>
                    <div className="row">
                        <div className="col-lg-6 d-flex justify-content-center">
                            <div className="card photo-card" style={{width: '300px', transition: 'transform 0.3s ease', marginBottom:'30px', marginTop:'40px' }}>
                                <img src={busImage} alt="Bus" className="card-img-top" style={{ height: '450px', objectFit: 'cover' }} />
                            </div>
                        </div>
                        <div className="col-lg-6 d-flex flex-column justify-content-center text-white">
                            <h2 className="mb-4 slide-up">"Every journey begins and ends with a bus ride."</h2>
                            <p className="lead mb-4">Experience comfort and convenience with our reliable bus services. Wherever you go, we ensure you arrive safely and on time.</p>
                            <div className="d-flex gap-3">
                               <button onClick={Suggests} className="btn btn-outline-primary">Add Bus</button>
                               <Link to='/seedetails' className="btn btn-outline-primary">See Details</Link>

                            </div>
                        </div>
                    </div>
            </div>

            </div>
            <Footer/>
        </div>
    )
}
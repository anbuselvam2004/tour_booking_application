import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link ,useNavigate} from 'react-router-dom';
import Nav from './NavAdmin'
import Footer from './footall'
import { auth, db } from './config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default function Seedetails()
{
    const hist=useNavigate();
   
    const [data,setdata]=useState([]);

    useEffect(()=>{
        const fetchdetail=async()=>{
        const dat=auth.currentUser;
        if(!dat){
           

            window.alert("Please login");
            hist('/Login-SignUp');
        }
        else{
        const em=dat.email;
        const docref=collection(db,'ImageUrl');
        const q = query(docref,where('email','==',em));
try{
        const querysnap=await getDocs(q);
        if(querysnap.empty){
            return <div>You have not upload bus</div>
        }
        else{    
        querysnap.forEach((element) => {
            setdata(element.data());
            
        });
    }
    }
    catch(error){
        console.log(error);
    }
}
}
fetchdetail();
    })

   

    return(
        <div>
            <Nav/>
            <div className='container'>
                <div className='row py-5'>
                    
                    <div className='card col-md-3'>
                        <img src={data.url} alt="temp"></img>
                    </div>
                    <div className='col-md-3'>
                        <div className='card-body'>
                            <p>{data.busname}</p>
                            <p>{data.busnumber}</p>
                            <p>{data.coach}</p>
                            <p>{data.Seats}</p>
                            <p>{data.ownername}</p>
                            <p>{data.email}</p>
                            <p>{data.contact}</p>
                            <p>{data.id}</p>

                        <Link to='/Editdetails'> <button  className='btn btn-primary'>Edit</button></Link>   
                        </div>
                    </div>
                  
                </div>
            </div>
            <Footer/>
        </div>
    )
}
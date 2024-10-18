import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navall'
import Foot from './footall'
// import { Link } from "react-router-dom";


export default function Anbu()
{
    return(
        <div>
            <Navbar/>
            <div className="container-fluid bg-primary">
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
                                <h1 className="mb-4 mt-5"> {busData.busname}</h1> 
                                <h3 className=" mb-2">{busData.busnumber}</h3> 
                                <h3 className="mb-2">{busData.Seats}</h3> 
                                <h3 className="mb-2"> {busData.coach}</h3>
                                <h3 className="mb-2"> {busData.ownname}</h3>
                                <h3 className="mb-2">{busData.contact}</h3> 
                                
                            </div>
                            <div className="d-flex gap-3">
                            <button className="btn btn-success" onClick={AddFav} >Add to favourite</button> 
                            <button className="btn btn-success">BOOK NOW</button>
                            </div>
                            <p className="text-white">Loading bus information...</p>
                        </div>
                </div>
                </div>
            </div>
            <Foot/>

        </div>
    )
}



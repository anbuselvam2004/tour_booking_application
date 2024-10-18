import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import img from './images/bl.png';
import './Signup.css';
import { Link } from "react-router-dom";
   function Log(){
    return(
       

        <div className="d-flex justify-content-center align-items-center vh-100 " id="bg-gradient"  >
      <div className="card p-4 text-center" style={{ maxWidth: '400px', width: '100%' }}>
        <img src={img} alt="log" className="card-img-top mx-auto" style={{ width: '100px', height: '100px' }} />
        <h2 className="my-4">To Login/SignUp as...?</h2>
        <div className="d-flex justify-content-around mb-3">
          <Link to="/User">
            <button className="btn btn-warning">User</button>
          </Link>
          <Link to="/Admin">
            <button className="btn btn-warning">Admin</button>
          </Link>
        </div>
       <Link to="/"> <button className="btn btn-dark">Back</button></Link>
      </div>
    </div>

    );
   }
   export default Log;
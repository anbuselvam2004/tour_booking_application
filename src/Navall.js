import React,{useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'jquery/dist/jquery.min.js';
import '@popperjs/core/dist/umd/popper.min.js';
import { auth } from './config/firebase';
import { signOut } from 'firebase/auth';

import { Link } from "react-router-dom";

import logo from './images/bl.png';
import slide from './icons/sliders.svg'

function Navbar()
{
    const [user, setUser] = useState(null);

    

    useEffect(() => {
        //  if(nchild){
        const unsubscribe = ()=>{
           const unsubscribe2=auth.currentUser;
            if (unsubscribe2) {
                // User is signed in, set the user state with email
                setUser(unsubscribe2);
            } else {
                // User is signed out, clear the user state
                setUser(null);
            }
       
        }
        // Cleanup subscription on unmount
        return () => unsubscribe();
   /* }*/  
    }, );

    return(
        <div>
            <nav className="navbar navbar-expand-lg " style={{ background: 'linear-gradient(to right, #003366, #0099cc)' }}>
                <div className="container-fluid">
                    {/* Navbar Brand */}
                    <a className="navbar-brand d-flex align-items-center" href="uyt">
                        <img src={logo} height={40} alt="Logo" className="me-2" aria-label="Company Logo" />
                        BOOK YOUR JOURNEY
                    </a>

                    {/* Toggler Button */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                       <img src={slide} alt="slider"></img>  
                    </button>

                    {/* Collapsible Navbar Items */}
                    <div className="collapse navbar-collapse" id="navbar">
                        <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center w-100">
                            {/* Search Bar */}
                            <form className="d-flex flex-grow-1 mb-2 mb-lg-0 me-lg-3">
                                <input type="search" placeholder="SEARCH" className="form-control" aria-label="Search" />
                            </form>

                            {/* Navbar Links */}
                            <ul className="navbar-nav flex-column flex-lg-row ms-lg-auto">
                                <li className="nav-item mb-2 mb-lg-0 me-lg-3">
                                    <Link to='/' style={{ color: 'black', textDecoration: 'none' }}>HOME</Link>
                                </li>
                                <li className="nav-item mb-2 mb-lg-0 me-lg-3">
                                    <Link to='/seat' style={{ color: 'black', textDecoration: 'none' }}>SEATERS</Link>
                                </li>
                                <li className="nav-item mb-2 mb-lg-0 me-lg-3">
                                    <Link to='/book' style={{ color: 'black', textDecoration: 'none' }}>BOOKINGS</Link>
                                </li>
                                <li className="nav-item mb-2 mb-lg-0 me-lg-3">
                                    <Link to='/fav' style={{ color: 'black', textDecoration: 'none' }}>MY FAVOURITES</Link>
                                </li>
                               
                            </ul>
                            {user ? (
                <div className='user-info'>{user.email}</div>
            ) : (
                            <Link to='/Login-SignUp'><button classname="btn btn-primary">SignUp/Login</button></Link>

                        )}
                        {user && (
                <button onClick={() => {
                    
                    signOut(auth).then(() => {
                        // Sign-out successful
                        setUser(null);
                    
                    }).catch((error) => {
                        console.error('Sign out error', error);
                    });
                }}><Link to='/'>Logout</Link></button>
            )}

                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;






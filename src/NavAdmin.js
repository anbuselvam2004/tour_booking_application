









import React,{useState,useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import slider from './icons/sliders.svg'

import { Link ,useNavigate} from 'react-router-dom';
import { auth } from './config/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';

import logo from './images/bl.png'

export default function Nav()
{
    const hist=useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);
    return(
        <div >
            <div className="navbar navbar-expand-lg navbar-light bg-transparent " style={{backdropFilter:'blur(2px)',background:' rgba(255, 255, 255, 0.6)'}}>
                <div className="container-fluid">
                    <div className="navbar-brand">
                        <img src={logo} alt="logoo" height={40}></img>
                        Book Your Journey
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle='collapse' data-bs-target='#navbar'>
                        <img src={slider} alt="Sliderbutton"></img>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar">
                        <ul className="navbar-nav ms-auto ">
                            <li className="nav-item">
                            <Link to='/admin-page'  className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                            <Link to='/Orders'  className="nav-link">Orders</Link>
                            </li>
                            <li className="nav-item">
                            <Link to='/admin-page'  className="nav-link">Contact</Link>

                            </li>
                         

                            <div className="navbar-actions">
                        {user ? (
                            <div>{user.email}</div>
                        ) : (
                            <li className="nav-item">
                             <Link to='/Login-SignUp'>   <button className="btn btn-outline-primary me-2">Login/SignUp</button></Link>
                            </li>
                              )}

                              {user && (
                                  <button
                                      onClick={() => {
                                          signOut(auth).then(() => {
                                              setUser(null);
                                              hist('/');
                                          }).catch((error) => {
                                              console.error('Sign out error', error);
                                          });
                                      }}
                                      className='btn btn-primary btn-logout'
                                  >
                                      Logout
                                  </button>
                              )}
                          </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}





















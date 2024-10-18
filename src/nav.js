import React,{useState,useEffect} from 'react';
import img from './images/bl.png';
import './navmain1.css';
import {Link} from 'react-router-dom';
import { auth } from './config/firebase';
import { signOut ,onAuthStateChanged} from 'firebase/auth';
import "bootstrap/dist/css/bootstrap.min.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';


function Nav(/*{nchild}*/){
    const [user, setUser] = useState(null);
useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update the user state whenever the auth state changes
      if (currentUser) {
        // fetchFavourites(currentUser);
        setUser(currentUser);
      } else {
        // setLoading(false); // If no user is logged in, stop loading
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
    

    return(
        <nav className='cont'>
            <img src={img} alt='logos'></img>
            <h2>Travels Booking..!</h2>
            <input type='text' placeholder='search for bus'  >
            </input>
            {/* <FontAwesomeIcon  className="text-3xl w-20 h-20"></FontAwesomeIcon> */}

            <button className='btn btn-danger' >Search</button>
            
            <ul>
            <li><Link to='/' className='link'>Home</Link></li>
            <li><Link to='/Bookings' className='link'>My Bookings</Link></li>
            <li><Link to='/Favourites' className='link'>Favourites</Link></li>
            <li><Link to='/' className='link'>Contact</Link></li>
            </ul>
            {user ? (
                <div className='user-info'>{user.email}</div>
            ) : (
                <Link to='/Login-SignUp'><button className='log-button'>
                    Signup/Login
                </button></Link>
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
            
        </nav>
    );
}
export default Nav;
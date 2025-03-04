
import React, { useState ,useEffect} from 'react';
import { db } from './config/firebase';
import { onSnapshot, collection } from 'firebase/firestore';
import './nav1.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';
import Foot from './footall';
import videoSource from './images/bgvideo (2).mp4';
import Nav from './nav1';

function App() {
  const handleExploreClick = () => {
    document.getElementById('additional-content').scrollIntoView({ behavior: 'smooth' });
  };

  const [newbuslist, setbuslist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
  const imgurl = () => {
    const busCollection = collection(db, 'ImageUrl');
    onSnapshot(busCollection, (snapshot) => {
      const buslist = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setbuslist(buslist);
    });
  };

  imgurl();
}, []);


const handleSearchChange = (event) => {
  setSearchTerm(event.target.value.toLowerCase());
};

// Filter bus list based on search term
const filteredBusList = newbuslist.filter((bus) =>
  bus.busname.toLowerCase().includes(searchTerm)
);

  return (
    <div>
        <Nav/>

      {/* Home */}
      <div className="video-background-container">
        <video className="video-background" autoPlay loop muted>
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="Home d-flex align-items-center">
          <div className="container bg-transparent border-0">
            <div className="row">
              <div className="col-md-6 text-center text-md-start">
                <h3 className="display-4 slide-up">Book Your Journey With Us!</h3>
                <p className="lead">Book a trip and make unlimited memories with your friends</p>
                <div className="input-group mb-3">
               
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search for bus"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <button className="btn btn-primary" type="button">Search</button>
                </div>
                <button className="btn btn-secondary mt-3" onClick={handleExploreClick}>Explore Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main page */}
      <div className="container-fluid" id='additional-content' style={{ background: 'linear-gradient(to right, #C0A1C2, #E790ED, #F6FCFB)' }}>
        <div className="container bg-transparent">
          <div className="row">
            {filteredBusList.map((ImageUrl) => (
              <div className="col-md-3 mb-4 mt-3" key={ImageUrl.id}>
                <div className="card bus-card fixed-card">
                  <img src={ImageUrl.url} alt="bus1" className="card-img-top" />
                  <div className="card-body">
                    <h2 className="bus-name"><strong>{ImageUrl.busname}</strong></h2>
                    <Link to={`/Booking-page/${ImageUrl.id}`}>
                      <button className="btn btn-primary">See more</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Foot />
    </div>
  );
}

export default App;
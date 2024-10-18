import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import AdminBusPage from './AdminBusAddPage.js';
// import Upload from './fileUploadpage.js';
//  import Login from './Signup.js';

import {AdminSignInWithPopup} from './Admin-Log.js';
import { Auth} from './components/auth.js';
import Log from './Own-User.js';
import App from './App.js';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import Favourite from './Favourites.js';
import Booking from './BookingDetails.js';
import Admin from './updatedadminpage.js';
import Main from './Main.js';
import { Mybookings } from './Mybookings.js';
import SuccessPage from './SucessfulUpload.js';
import Details from './busdetail.js';
import Seedetails from './seedetails.js';
import Edit from './Editdetails.js';
import Uploaded from './Alredyuploaded.js';

// const bool=true;
const log_as_User="user";

const storeUser="userdetail01";
const storeAdmin="userdetail02";

const rout=createBrowserRouter([
  {
  
    path:'/',
    element: <App/>
},
{
  path:'/next',
  element:<App/>
},
{
  path:'/Login-SignUp',
  element:<Log/>
},
{
  path:'/User',
  element:<Auth child={log_as_User}/>
},
{
  path:'/Admin',
  element:<Auth />,
},
{
  path:'/user-page',
  element:<App /*child={bool}*//>,
},
{
  path:'/admin-page',
  element:<Admin/>,
},
{
  path:'/adminSignup',
  element:<AdminSignInWithPopup child={storeAdmin}/>,
},
{
  path:'/userSignup',
  element:<AdminSignInWithPopup child={storeUser}/>,
},
{
  path:'/user-logged-page',
  element:<App /*child={bool}*//>,
},
{
  path:'/Admin-logged-page',
  element:<Admin/>
},
{
  path:'/Booking-page/:id',
  element:<Details/>
},
{
  path:'/Favourites',
  element:<Favourite/>
},
{
  path:'BookBus/:id',
  element:<Booking  />
},
{
  path:'/addbus',
  element:<AdminBusPage/>
},
{
  path:'/Orders',
  element:<Main/>
},
{
  path:'/Bookings',
  element:<Mybookings/>
},
{
  path:'/SucessUpload',
  element:<SuccessPage/>,
},
{
  path:'/seedetails',
  element:<Seedetails/>
},
{
  path:'/Editdetails',
  element:<Edit/>
},
{
  path:'/Upload',
  element:<Uploaded/>
}
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={rout}/> 
   
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

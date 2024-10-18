// import React, { useEffect, useState } from "react";
// import { db ,auth} from "./config/firebase";
// import Nav from "./nav";
// import { getDoc,doc } from "firebase/firestore";
// import { signOut } from "firebase/auth";

// let bool=true;

// function Favourite(){
    
//     const [curdata,setdata]=useState();
//     const [curdata2,setdata2]=useState();

//     useEffect(()=>{

//         const tem=()=>{
//         signOut(auth).then(() => {
//             // Sign-out successful
//             setdata(null);
        
//         }).catch((error) => {
//             console.error('Sign out error', error);
//         });
//     }
        
//     const Show=async()=>{
//         tem();
//         const data=auth.currentUser;
//         if(data){
            
//             const ref=doc(db,'favourites',data.uid);
//             const unref=await getDoc(ref);
//             console.log()
//             if(unref.exists()){
//                 setdata(unref.data());

//                 const ref2=doc(db,'ImageUrl',unref.data().imgid);
//                 const unref2=await getDoc(ref2);
//                 if(unref2.exists()){
//                     setdata2(unref2.data());
//                 }
//                 else{
//                     console.log("No such documents");
//                 }

//             }
//             else{
//                 console.log("No such document");
//             }
//         }
//         else{
//             window.alert("Please login");
//         }
//     }
//   Show();

// },[]);

// if (!curdata || !curdata2) {
//     return <div>Loading...</div>; // Handle loading state
// }
//     return(
//         <div>
//             <Nav nchild={bool}/>

//             <div>
//             <div className="col-md-8">
//                     <h1 className="display-4" ><p >{curdata2.busname}</p></h1>
//                     <p className="lead" >
//                         <strong>Bus Name:</strong> {curdata2.busname}
//                     </p>
//                     <p className="lead">
//                         <strong>Bus Number:</strong> {curdata2.busnumber}
//                     </p>
//                     <p className="lead">
//                         <strong>Number of Seats:</strong> {curdata2.Seats}
//                     </p>
//                     <p className="lead">
//                         <strong>Coach:</strong> {curdata2.coach}
//                     </p>
//                     <p className="lead">
//                         <strong>Owner Name:</strong> {curdata2.ownname}
//                     </p>
//                     <p className="lead">
//                         <strong>Contact:</strong> {curdata2.contact}
//                     </p>
//                 </div>
//             </div>
//         </div>
//     )
// }
// export default Favourite;













import React, { useEffect, useState } from "react";
import { db, auth } from "./config/firebase";
import Nav from "./nav1";
import { getDoc, doc } from "firebase/firestore";
import { Button } from "react-bootstrap"; 
import Footer from "./footall";
// import Log from "./Own-User";

//  let bool = false;

function Favourite() {
  const [busDataList, setBusDataList] = useState([]); // To store multiple bus data
  const [loading, setLoading] = useState(true); // To handle loading state

  useEffect(() => {
    const fetchFavourites = async () => {
      
        const user = auth.currentUser;
       

        if (!user) {
          window.alert("Please login");
          setLoading(false);
          return;
          // bool=true;

          
        
        }
        try {

        const userFavDocRef = doc(db, 'favourites', user.uid);
        const userFavDocSnap = await getDoc(userFavDocRef);

        if (userFavDocSnap.exists()) {
          const { imgid } = userFavDocSnap.data(); // Assuming `imgid` is an array
          
          // Ensure imgid is an array and has elements
          if (Array.isArray(imgid) && imgid.length > 0) {
            const busDataPromises = imgid.map(async (id) => {
              console.log(id);

              if (!id) {
                console.error("Invalid document ID:", id);
                return null;
              }
              const busDocRef = doc(db, 'ImageUrl', id);
              const busDocSnap = await getDoc(busDocRef);
              return busDocSnap.exists() ? busDocSnap.data() : null;
            });

            // Resolve all promises and filter out null results
            const busDataResults = await Promise.all(busDataPromises);
            setBusDataList(busDataResults.filter((data) => data !== null));
          } else {
            console.log("No buses found in favorites.");
          }
        } else {
          console.log("No such document for user favorites.");
        }
      } catch (error) {
        console.error("Error fetching favorite buses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, []);

  if (busDataList.length === 0) {
    return <div> No favourites found </div>;
  }

  if (loading) {
    return <div>Loading...</div>; // Handle loading state
  }


 

  return (
    <div>
      <Nav /*nchild={bool}*/ />
    
       <div className="container mt-4">
        <div className="row">
          {busDataList.map((busData, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img src={busData.url} className="card-img-top" alt="Bus" />
                <div className="card-body">
                  <h5 className="card-title">{busData.busname}</h5>
                  <p className="card-text"><strong>Bus Number:</strong> {busData.busnumber}</p>
                  <p className="card-text"><strong>Number of Seats:</strong> {busData.Seats}</p>
                  <p className="card-text"><strong>Coach:</strong> {busData.coach}</p>
                  <p className="card-text"><strong>Owner Name:</strong> {busData.ownname}</p>
                  <p className="card-text"><strong>Contact:</strong> {busData.contact}</p>
                </div>
                <div className="card-footer text-center">
                  <Button variant="primary">Book Now</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Favourite;







































// import React, { useEffect, useState } from "react";
// import { db, auth } from "./config/firebase";
// import Nav from "./nav";
// import { getDoc, doc } from "firebase/firestore";
// import { Button } from "react-bootstrap";
// import { onAuthStateChanged } from "firebase/auth"; // Import onAuthStateChanged

// function Favourite() {
//   const [busDataList, setBusDataList] = useState([]); // To store multiple bus data
//   const [loading, setLoading] = useState(true); // To handle loading state
//   const [user, setUser] = useState(null); // State to store the current user

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser); // Update the user state whenever the auth state changes
//       if (currentUser) {
//         fetchFavourites(currentUser);
//       } else {
//         setLoading(false); // If no user is logged in, stop loading
//       }
//     });

//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, []);

//   const fetchFavourites = async (currentUser) => {
//     try {
//       const userFavDocRef = doc(db, "favourites", currentUser.uid);
//       const userFavDocSnap = await getDoc(userFavDocRef);

//       if (userFavDocSnap.exists()) {
//         const { imgid } = userFavDocSnap.data(); // Assuming `imgid` is an array

//         // Ensure imgid is an array and has elements
//         if (Array.isArray(imgid) && imgid.length > 0) {
//           const busDataPromises = imgid.map(async (id) => {
//             const busDocRef = doc(db, "ImageUrl", id);
//             const busDocSnap = await getDoc(busDocRef);
//             return busDocSnap.exists() ? busDocSnap.data() : null;
//           });

//           // Resolve all promises and filter out null results
//           const busDataResults = await Promise.all(busDataPromises);
//           setBusDataList(busDataResults.filter((data) => data !== null));
//         } else {
//           console.log("No buses found in favorites.");
//         }
//       } else {
//         console.log("No such document for user favorites.");
//       }
//     } catch (error) {
//       console.error("Error fetching favorite buses:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>; // Handle loading state
//   }

//   if (busDataList.length === 0) {
//     return <div>No favorites found.</div>;
//   }

//   return (
//     <div>
//       <Nav />
//       <div className="container mt-4">
//         <div className="row">
//           {busDataList.map((busData, index) => (
//             <div key={index} className="col-12 col-md-6 col-lg-4 mb-4">
//               <div className="card h-100 shadow-sm">
//                 <img src={busData.url} className="card-img-top" alt="Bus" />
//                 <div className="card-body">
//                   <h5 className="card-title">{busData.busname}</h5>
//                   <p className="card-text"><strong>Bus Number:</strong> {busData.busnumber}</p>
//                   <p className="card-text"><strong>Number of Seats:</strong> {busData.Seats}</p>
//                   <p className="card-text"><strong>Coach:</strong> {busData.coach}</p>
//                   <p className="card-text"><strong>Owner Name:</strong> {busData.ownname}</p>
//                   <p className="card-text"><strong>Contact:</strong> {busData.contact}</p>
//                 </div>
//                 <div className="card-footer text-center">
//                   <Button variant="primary">Book Now</Button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Favourite;

import React, { useEffect, useState } from "react";
import Nav from "./NavAdmin";
import { where, query, getDocs, collection } from "firebase/firestore";
import { db, auth } from "./config/firebase"; // Combined imports for firebase config
import 'bootstrap/dist/css/bootstrap.min.css';


function Uploaded() {
  const [admin, setAdmin] = useState(null); // Corrected variable name case

  useEffect(() => {
    const Suggests = async () => {
      try {
        const dat = auth.currentUser;
        if (!dat) {
          console.error("No authenticated user found");
          return;
        }
        const email = dat.email;
        console.log(email);

        const quer = query(collection(db, "ImageUrl"), where("email", "==", email));
        const snap = await getDocs(quer);

        if (snap.empty) {
          console.log("No matching document found");
        } else {
          const doc = snap.docs[0];
          setAdmin({ id: doc.id, ...doc.data() });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    Suggests();
  }, []);

  return (
    <div>
      <Nav />
      <div className="d-flex  justify-content-center align-items-center m-4">
        {/* Conditional rendering based on admin state */}
        {admin ? (
          <h3 className="text-danger " >!!!You have already uploaded the bus named {admin.busname}</h3>
        ) : (
          <p>Loading bus information...</p>
        )}
      </div>
    </div>
  );
}

export default Uploaded;

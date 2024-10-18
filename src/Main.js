




import Nav from "./NavAdmin";
import React, { useEffect, useState,useRef } from 'react';
import { Button, Card } from 'react-bootstrap';
import { auth, db } from "./config/firebase";
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where,arrayRemove } from "firebase/firestore";
import emailjs from '@emailjs/browser';
import Footer from "./footall";


function TicketCard() {
  const [bookingData, setBookingData] = useState([]);
  const [showAcceptConfirm, setShowAcceptConfirm] = useState(false);
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);

  const [firstDocId,setfirstDocId]=useState();
  const [con,setcon]=useState("");
  const [emailid,setemailid]=useState('');
  const form=useRef();

  const AcceptanceEmail = () => {
    
    emailjs
      .sendForm('service_1povgeb', 'template_8cbgd7n', form.current, {
        publicKey: 'WNwgDfufi9SlU2S__',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  useEffect(() => {
    const fetchTicket = async () => {
      const dat = auth.currentUser;
      try {
        if (!dat) {
          return <div>Loading...</div>;
        }
        const docRef = doc(db, 'Bookings', dat.email);
        const books = await getDoc(docRef);
        if (books.exists()) {
          const booksData = books.data();
          setBookingData(booksData.mybooking || []);
        } else {
          return(
            <div>
              <h1>No Orders</h1>
            </div>
          )
        }
      } catch (error) {
        console.error(error);
      }
      const coll=collection(db,'ImageUrl');
      const q=query(coll,where('email','==',dat.email));
      const querysnap=await getDocs(q);
      if(!querysnap.empty){
         setfirstDocId(querysnap.docs[0].data().busname);
         setcon(querysnap.docs[0].data().contact);
        
     
        
      }
    };
    fetchTicket();
  }, []);





  const handleAcceptClick = () => {
    setShowAcceptConfirm(true);
    setShowRejectConfirm(false);
  };

  const handleRejectClick = () => {
    setShowRejectConfirm(true);
    setShowAcceptConfirm(false);
  };

  const handleConfirmAccept = async (index) => {
    console.log("Order accepted");
    try {
      const dat = auth.currentUser;
      if (dat) {
        const fav = doc(db, 'Bookings', dat.email);
        const doc1 = await getDoc(fav);
        console.log(doc1);
        const emid = doc1.data().mybooking;
      
        // const BookStstatus = doc(db, 'Bookingstatus', emid);
        // const det = await getDoc(BookStstatus);
        // console.log("status");

        // if (det.exists) {
        //   await updateDoc(BookStstatus, {
        //     stat: "Your order has been confirmed. For any inquiry, call the number given on the website.",
        //   });
        // } else {
        //   await setDoc(BookStstatus, {
        //     stat: "Your order has been confirmed. For any inquiry, call the number given on the website.",
        //   });
        // }


        // const emails = emid.map((booking) => booking.email);

        // emails.forEach(async (email) => {
        //   const BookStstatus = doc(db, 'Bookingstatus', email);
        //   const det = await getDoc(BookStstatus);
          
        //   if (det.exists()) {
        //     await updateDoc(BookStstatus, {
        //       stat: "Your order has been confirmed. For any inquiry, call the number given on the website.",
        //     });
        //   } else {
        //     await setDoc(BookStstatus, {
        //       stat: "Your order has been confirmed. For any inquiry, call the number given on the website.",
        //     });
        //   }
        // }); 

        const email=emid[index].email;
       const start=emid[index].startLocation;
       const end=emid[index].destination;
       const stdate=emid[index].startdate;
       const edate=emid[index].enddate;
       const name=emid[index].username;
        const BookStstatus = doc(db, 'Bookingstatus', email);
        const det = await getDoc(BookStstatus);
       console.log(name);
        if (det.exists()) {
          console.log("yes");
          console.log(con);
          await updateDoc(BookStstatus, {
            stat: "Dear, "+`${name}` + " Your order ["+`${firstDocId}`+"] from  " +`${start}`+" to " + `${end}`+" on "+`${stdate}` +" has been Confirmed. For more enquiry,Call:"+`${con}`+"  Thanking you...!",
          });
        } else {
          console.log("no");
          await setDoc(BookStstatus, {
            stat: "Dear, "+`${name}` + " Your order from " +`${start}`+" to " + `${end}`+" on "+`${stdate}` +" has been confirmed. For more enquiry, call the number given on the website.",

          });
        }
        
        AcceptanceEmail();
        window.alert("Status sent successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmReject = async (index) => {
    console.log("Order rejected");
    try {
      const dat = auth.currentUser;
      if (dat) {
        const fav = doc(db, 'Bookings', dat.email);
        const doc1 = await getDoc(fav);
        const emid = doc1.data().mybooking;
       const email=emid[index].email;
       const start=emid[index].startLocation;
       const end=emid[index].destination;
       const stdate=emid[index].startdate;
       const edate=emid[index].enddate;
       const name=emid[index].username;
        const BookStstatus = doc(db, 'Bookingstatus', email);
        const det = await getDoc(BookStstatus);
       
        if (det.exists()) {
          console.log("yes");
          await updateDoc(BookStstatus, {
            stat: "Dear, "+`${name}` + " Your order from " +`${start}`+" to " + `${end}`+" on "+`${stdate}` +" has been cancelled. For more enquiry, call the number given on the website.",
          });
        } else {
          console.log("no");
          await setDoc(BookStstatus, {
            stat: "Dear, "+`${name}` + " Your order from " +`${start}`+" to " + `${end}`+" on "+`${stdate}` +" has been cancelled. For more enquiry, call the number given on the website.",

          });
        }

        await updateDoc(fav, {
          mybooking: arrayRemove(emid[index])  // Remove the specific booking
        });
     
        setBookingData((prevData) => prevData.filter((_, i) => i !== index));

        window.alert("Status sent successfully");
      }
    } catch (error) {
      console.error(error);
      window.alert("Error");
    }
  };

 

  return (
    <div>
      <Nav />

      {bookingData.map((userdata, index) => (
        <div className="container mt-4" key={index}>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <Card className="shadow-lg border-0 rounded-3">
                <Card.Body className="p-4">
                  <Card.Title className="mb-4 text-center display-6 text-primary">{userdata.username}</Card.Title>
                  <Card.Text className="text-muted text-center">
                    <strong className="text-secondary">Coach Type:</strong> {userdata.coach} <br />
                    <strong className="text-secondary">Starting Location:</strong> {userdata.startLocation} <br />
                    <strong className="text-secondary">Destination:</strong> {userdata.destination} <br />
                    <strong className="text-secondary">Departure Date:</strong> {userdata.startdate} <br />
                    <strong className="text-secondary">Arrival Date:</strong> {userdata.enddate}<br/>
                    <strong className="text-secondary">Contact :</strong> {userdata.contact}<br/>

                    <input type="text" className="hidden d-none" value={userdata.email} onChange={((e)=>{setemailid(e.target.value)})}></input>
                  </Card.Text>
                  <div className="d-flex justify-content-around mt-4">
                    <Button variant="outline-success" className="btn-lg px-4 py-2" onClick={handleAcceptClick}>Accept Order</Button>
                    <Button variant="outline-danger" className="btn-lg px-4 py-2" onClick={handleRejectClick}>Reject Order</Button>
                  </div>

                  <div>
                    <form ref={form} >
                      <input type="text" name="to_name" className="hidden d-none" value={userdata.username}></input>
                      <input type="text" name="to_coach" className="hidden d-none" value={userdata.coachtype}></input>
                      <input type="text" name="to_start" className="hidden d-none" value={userdata.startLocation}></input>
                      <input type="text" name="to_end" className="hidden d-none" value={userdata.destination}></input>
                      <input type="text" name="to_sdate" className="hidden d-none" value={userdata.startdate}></input>
                      <input type="text" name="to_edate" className="hidden d-none" value={userdata.enddate}></input>
                      <input type="email" name="to_mail" className="hidden d-none" value={userdata.email}></input>




                   
                        <input type="text" name="from_name" value={firstDocId} className="hidden d-none" ></input>
                        <input type="text" name="from_num" value={con} className="hidden d-none" ></input>

                    
                      

                    </form>
                  </div>

                  {/* Confirmation for Accept */}
                  {showAcceptConfirm && (
                    <div className="mt-3 text-center">
                      <p>Are you sure you want to accept this order?</p>
                      <Button variant="success" style={{color:'black'}} onClick={()=>handleConfirmAccept(index)}>Confirm Accept</Button>
                    </div>
                  )}

                  {/* Confirmation for Reject */}
                  {showRejectConfirm && (
                    <div className="mt-3 text-center">
                      <p>Are you sure you want to reject this order?</p>
                      <Button variant="danger" style={{color:'black'}} onClick={()=>handleConfirmReject(index)}>Confirm Reject</Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      ))}

      <Footer/>
    </div>
  );
}

export default TicketCard;
  
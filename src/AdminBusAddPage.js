import React,{  useState } from "react";
import { Store,auth,db } from "./config/firebase";
import { collection,addDoc,getDocs } from "firebase/firestore";
import { getDownloadURL, ref,uploadBytesResumable } from "firebase/storage";
import image from './images/bl.png';
import 'bootstrap/dist/css/bootstrap.min.css';

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import Nav from "./NavAdmin";
import Footer from "./footall";


 function AdminBusPage(){
    const hist=useNavigate();
    const [link1,link2]=useState([]);
    const [multipleFiles,setMultipleFiles]=useState([]);
    const [name,newname]=useState("");
    const [file,setFile]=useState(null);
    const [email,newemail]=useState("");
    const [seat,newseat]=useState(0);
    const [coach,newcoach]=useState("");
    const [numberplate,newnumberplate]=useState("");
    const [connumber,newconnumber]=useState(0);
    const [ownname,newownername]=useState("");
    const [progress,setprogress]=useState(0);
    const [downloadurl,setdownloadurl]=useState("");
    const [downloadurls,setdownloadurls]=useState([]);

    const [errors, setErrors] = useState({});

  let urlimg="";
  let urlsimg=[];

    
    const HandleImg=(e)=>{
        setFile(e.target.files[0]);
    }
    const HandleMultipleImg=(e)=>{
        setMultipleFiles(Array.from(e.target.files));
    }


    const validateForm = () => {
        const newErrors = {};
      
        // Validate owner name
        if (!ownname.trim()) {
          window.alert("Owner name is required");
          newErrors.ownname = "Owner name is required";
        }
      
        // Validate bus name
        if (!name.trim()) {
          window.alert("BUS  name is required");

          newErrors.name = "Bus name is required";
        }
      
        // Validate email
        if (!email.trim()) {
          window.alert("email is required");
          newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          newErrors.email = "Email address is invalid";
        }
      
        // Validate bus number
        if (!numberplate.trim()) {
          window.alert("Bus number is required");
          newErrors.numberplate = "Bus number is required";
        }
      
        // Validate contact number
        let connumber1=connumber.toString();
        if (!connumber1.trim()) {
          window.alert("contact is required");
          newErrors.connumber = "Contact number is required";
        } else if (!/^\d+$/.test(connumber)) {
          newErrors.connumber = "Contact number must be a valid number";
        }
      
        // Validate RC number (assuming it's the seat field in your form)
        let seat1=seat.toString();
        if (!seat1.trim()) {
          window.alert("seat number is required");
          newErrors.seat = "seat number is required";
        }
      
        // Validate bus type
        if (!coach.trim() || coach === "Bus type") {
          window.alert("coach type is required");
          newErrors.coach = "Bus type is required";
        }
        if(!file){
          window.alert("File must not be empty");
          newErrors.file="Files not be empty";
        }
        if(!multipleFiles){
          window.alert("Multiple Files not be empty");
          newErrors.multipleFiles="Files not be empty";

        }
      
        setErrors(newErrors);
      
        // Return true if there are no errors
        return Object.keys(newErrors).length === 0;
      };
      


    const HandleUploadImg=async()=>{
        
        if (!validateForm()) {
            // If the form is not valid, return early to prevent further actions
            return;
          }


        const dat=auth.currentUser;
        if(dat.email==email){
        try{
       await uploadSingle();
        //--------------------------------------------------------------
        //multiple images

     await UploadMultiple();
        
      // await uploadUrl(urlimg,urlsimg);

      handle();
      console.log("After upload")

      hist('/SucessUpload');
        }
        catch(error){
            console.error(error);
        }
    }
    else{
        window.alert("Please enter valid mail");
    }

      
        
       
    } 

// const uploadSingle=async()=>{
//   console.log("Upload single");
    
//     if(!file){
//         return;
//     }
    
//     const storageRef=ref(Store,`uploads/${file.name}`);
//     const uploadtask=uploadBytesResumable(storageRef,file);
//     console.log("Upload single");

//     uploadtask.on(
//         "state_changed",(snapshot)=>{
//             const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
//             setprogress(progress);
            
//         },
//         (error)=>{
//             window.alert("Upload failed");
//             console.error(error);
//         },
//         ()=>{
//             getDownloadURL(uploadtask.snapshot.ref).then((downloadurl1) =>{
//                 setdownloadurl(downloadurl1);
//                  urlimg=downloadurl1;
//                 // uploadUrl(urlimg,downloadurls);
//                 console.log(downloadurl1);
                
//         });
//         }
//     );
//     console.log("Upload single completed");

// }
// const UploadMultiple=async()=>{
//   console.log("Upload multiple");
//     try{
//     if(!multipleFiles.length){
//         return
//     }
//     const uploadPromises=[];
//     const urls=[];

//     multipleFiles.forEach((file)=>{
//         const storageRef=ref(Store,`uploads/multiple/${file.name}`);
//         const uploadTask=uploadBytesResumable(storageRef,file);

//         const uploadPromise=new Promise((resolve,reject)=>{
//             uploadTask.on(
//                 "state_changed",
//                 (snapshot)=>{
//                     const progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
//                     setprogress(progress);
//                 },
//                 (error)=>{
//                     console.error(error);
//                     reject(error);
//                 },
//                 ()=>{
//                     getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
//                         urls.push(url);
//                         resolve(url);
//                     })
//                     .catch((error)=>{
//                         console.error(error);
//                         reject(error);
//                     })
//                 }
//             );
//         });
//         uploadPromises.push(uploadPromise);
//     });
//     Promise.all(uploadPromises)
//     .then((urls)=>{
//         setdownloadurls(urls);
//         // uploadUrl(downloadurl,urls);
//         console.log(urls);
//         urlsimg=urls;
        
//     })
//     .catch((error)=>{
//         console.error(error);
//     })
// }
// catch(error){
//     console.error(error);
// }

// console.log("Upload multiple completed");
// }
    

const uploadSingle = async () => {
  console.log("Upload single");
  
  if (!file) {
      return;
  }
  
  const storageRef = ref(Store, `uploads/${file.name}`);
  const uploadtask = uploadBytesResumable(storageRef, file);
  console.log("Upload single");

  return new Promise((resolve, reject) => {
      uploadtask.on(
          "state_changed",
          (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setprogress(progress);
          },
          (error) => {
              window.alert("Upload failed");
              console.error(error);
              reject(error);
          },
          () => {
              getDownloadURL(uploadtask.snapshot.ref).then((downloadurl1) => {
                  setdownloadurl(downloadurl1);
                  urlimg = downloadurl1;
                  console.log(downloadurl1);
                  resolve(downloadurl1);
              }).catch(reject);
          }
      );
  });
};

const UploadMultiple = async () => {
  console.log("Upload multiple");
  
  if (!multipleFiles.length) {
      return;
  }

  const uploadPromises = [];
  const urls = [];

  multipleFiles.forEach((file) => {
      const storageRef = ref(Store, `uploads/multiple/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      const uploadPromise = new Promise((resolve, reject) => {
          uploadTask.on(
              "state_changed",
              (snapshot) => {
                  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  setprogress(progress);
              },
              (error) => {
                  console.error(error);
                  reject(error);
              },
              () => {
                  getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                      urlsimg.push(url);
                      resolve(url);
                  }).catch(reject);
              }
          );
      });
      uploadPromises.push(uploadPromise);
  });

  return Promise.all(uploadPromises)
      .then((urls) => {
          setdownloadurls(urls);
          console.log(urls);
      })
      .catch((error) => {
          console.error(error);
      });
};





const UrlCollection=collection(db,"ImageUrl");



const uploadUrl=async(child,multiple)=>{
  console.log("Uploading details");
    try{
      await  addDoc(UrlCollection,{
            url:`${child}`,
            urls:multiple,
            ownername:ownname,
            contact:connumber,
            busname:name,
            busnumber:numberplate,
            coach:coach,
            Seats:seat,
            email:email
        })
    }
    catch(error){
        console.error(error);
    }
}
// const geturl= async ()=>{
//     const data = await getDocs(UrlCollection);

    
//     const filter=data.docs.map((doc)=>({
//         ...doc.data(),
//         id:doc.id,
//     }))
//     link2(filter);
// }


const handle=()=>{
  console.log(urlimg);
  console.log(urlsimg);

  uploadUrl(urlimg,urlsimg);
}
    return (
        <div>
        <Nav />
        <div className="bg-gradient  min-vh-100 d-flex justify-content-center align-items-center">
          <div className="container bg-light p-5 rounded shadow-lg">
            <form>
              <div className="text-center mb-4">
                <img
                  src={image}
                  alt="Logo"
                  className="img-fluid rounded-circle border border-primary"
                  style={{ maxHeight: '150px' }}
                />
              </div>
              <div className="text-center mb-4">
                <h4 className="font-weight-bold text-uppercase">Bus Details</h4>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="font-weight-bold">Owner Name:</label>
                  <input
                    type="text"
                    onChange={(e) => newownername(e.target.value)}
                    className="form-control border border-primary rounded"
                    placeholder="Enter owner's name"
                  />
                    {errors.ownname && <div className="invalid-feedback">{errors.ownname}</div>}

                </div>
                <div className="col-md-6 mb-3">
                  <label className="font-weight-bold">Bus Name:</label>
                  <input
                    type="text"
                    onChange={(e) => newname(e.target.value)}
                    className="form-control border border-primary rounded"
                    placeholder="Enter bus name"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="font-weight-bold">Email (used for login):</label>
                  <input
                    type="email"
                    onChange={(e) => newemail(e.target.value)}
                    className="form-control border border-primary rounded"
                    placeholder="Enter bus email"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="font-weight-bold">Bus No:</label>
                  <input
                    type="text"
                    onChange={(e) => newnumberplate(e.target.value)}
                    className="form-control border border-primary rounded"
                    placeholder="Enter bus number"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="font-weight-bold"> No of Seats In Bus :</label>
                  <input
                    type="number"
                    onChange={(e) => newseat(e.target.value)}
                    className="form-control border border-primary rounded"
                    placeholder="Enter RC number"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="font-weight-bold">Contact Number:</label>
                  <input
                    type="text"
                    onChange={(e) => newconnumber(e.target.value)}
                    className="form-control border border-primary rounded"
                    placeholder="Enter contact number"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="font-weight-bold">Bus Type:</label>
                  <select
                    onChange={(e) => newcoach(e.target.value)}
                    className="form-control border border-primary rounded"
                  >
                    <option>Bus type</option>
                    <option>AC</option>
                    <option>Non AC</option>
                    <option>NonAC/AC</option>
                  </select>
                </div>
              </div>
              <div className="form-group text-center mb-3">
                <label
                  htmlFor="dropzone-file"
                  className="btn btn-outline-primary btn-lg"
                >
                  Add Photos
                </label>
                <input
                  id="dropzone-file"
                  onChange={HandleImg}
                  type="file"
                  className="d-none"
                  required
                />
                <p className="text-muted small">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <div className="form-group text-center mb-4">
              <label
                  htmlFor="dropzone-file1"
                  className="btn btn-outline-primary btn-lg"
                >
                  Add Photos
                </label>
                <input
                  id="dropzone-file1"
                  onChange={HandleMultipleImg}
                  type="file"
                  multiple
                  className="form-control-file border border-primary rounded"
                />
              </div>
              <div className="text-center">
                <button
                  type="button"
                  onClick={HandleUploadImg}
                  className="btn btn-primary text-black btn-lg btn-block mb-3"
                >
                  Submit
                </button>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${progress}%` }}
                    aria-valuenow={progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {progress}%
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Footer/>
      </div>
  
    );
    
// 
 }
export default AdminBusPage;



    















































// import React, { useState } from "react";
// import { Store, auth, db } from "./config/firebase";
// import { collection, addDoc } from "firebase/firestore";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import image from './images/bl.png';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from "react-router-dom";
// import Nav from "./NavAdmin";
// import Footer from "./footall";

// function AdminBusPage() {
//   const hist = useNavigate();
//   const [link1, setLink1] = useState([]);
//   const [multipleFiles, setMultipleFiles] = useState([]);
//   const [name, setName] = useState("");
//   const [file, setFile] = useState(null);
//   const [email, setEmail] = useState("");
//   const [seat, setSeat] = useState(0);
//   const [coach, setCoach] = useState("");
//   const [numberplate, setNumberplate] = useState("");
//   const [connumber, setConnumber] = useState(0);
//   const [ownname, setOwnername] = useState("");
//   const [progress, setProgress] = useState(0);
//   const [downloadurl, setDownloadurl] = useState("");
//   const [downloadurls, setDownloadurls] = useState([]);
//   const [errors, setErrors] = useState({});

//   const HandleImg = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const HandleMultipleImg = (e) => {
//     setMultipleFiles(Array.from(e.target.files));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     // Add validation code...
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const HandleUploadImg = async () => {
//     if (!validateForm()) {
//       return;
//     }

//     const dat = auth.currentUser;
//     if (dat.email === email) {
//       try {
//         // Start image uploads
//         await Promise.all([uploadSingle(), UploadMultiple()]);

//         // Once uploads are complete, save the URLs to Firestore
//         await handle();
        
//         // Navigate to success page
//         hist('/SuccessUpload');
//       } catch (error) {
//         console.error(error);
//       }
//     } else {
//       window.alert("Please enter a valid email");
//     }
//   };

//   const uploadSingle = async () => {
//     if (!file) return;

//     const storageRef = ref(Store, `uploads/${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     return new Promise((resolve, reject) => {
//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           setProgress(progress);
//         },
//         (error) => {
//           window.alert("Upload failed");
//           console.error(error);
//           reject(error);
//         },
//         async () => {
//           try {
//             const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//             setDownloadurl(downloadURL);
//             resolve();
//           } catch (error) {
//             window.alert("Failed to get download URL");
//             console.error(error);
//             reject(error);
//           }
//         }
//       );
//     });
//   };

//   const UploadMultiple = async () => {
//     if (!multipleFiles.length) return;

//     try {
//       const uploadPromises = multipleFiles.map((file) => {
//         const storageRef = ref(Store, `uploads/multiple/${file.name}`);
//         const uploadTask = uploadBytesResumable(storageRef, file);

//         return new Promise((resolve, reject) => {
//           uploadTask.on(
//             "state_changed",
//             (snapshot) => {
//               const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//               setProgress(progress);
//             },
//             (error) => {
//               console.error(error);
//               reject(error);
//             },
//             async () => {
//               try {
//                 const url = await getDownloadURL(uploadTask.snapshot.ref);
//                 setDownloadurls((prevUrls) => [...prevUrls, url]);
//                 resolve();
//               } catch (error) {
//                 console.error(error);
//                 reject(error);
//               }
//             }
//           );
//         });
//       });

//       await Promise.all(uploadPromises);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const UrlCollection = collection(db, "ImageUrl");

//   const uploadUrl = async (singleUrl, multipleUrls) => {
//     try {
//       await addDoc(UrlCollection, {
//         url: singleUrl,
//         urls: multipleUrls,
//         ownername: ownname,
//         contact: connumber,
//         busname: name,
//         busnumber: numberplate,
//         coach: coach,
//         Seats: seat,
//         email: email
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handle = async () => {
//     await uploadUrl(downloadurl, downloadurls);
//   };

//   return (
//     <div>
//       <Nav />
//       <div className="bg-gradient min-vh-100 d-flex justify-content-center align-items-center">
//         <div className="container bg-light p-5 rounded shadow-lg">
//           <form>
//             <div className="text-center mb-4">
//               <img
//                 src={image}
//                 alt="Logo"
//                 className="img-fluid rounded-circle border border-primary"
//                 style={{ maxHeight: '150px' }}
//               />
//             </div>
//             <div className="text-center mb-4">
//               <h4 className="font-weight-bold text-uppercase">Bus Details</h4>
//             </div>
//             <div className="row">
//               <div className="col-md-6 mb-3">
//                 <label className="font-weight-bold">Owner Name:</label>
//                 <input
//                   type="text"
//                   onChange={(e) => setOwnername(e.target.value)}
//                   className="form-control border border-primary rounded"
//                   placeholder="Enter owner's name"
//                 />
//                 {errors.ownname && <div className="invalid-feedback">{errors.ownname}</div>}
//               </div>
//               <div className="col-md-6 mb-3">
//                 <label className="font-weight-bold">Bus Name:</label>
//                 <input
//                   type="text"
//                   onChange={(e) => setName(e.target.value)}
//                   className="form-control border border-primary rounded"
//                   placeholder="Enter bus name"
//                 />
//               </div>
//               <div className="col-md-6 mb-3">
//                 <label className="font-weight-bold">Email (used for login):</label>
//                 <input
//                   type="email"
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="form-control border border-primary rounded"
//                   placeholder="Enter bus email"
//                 />
//               </div>
//               <div className="col-md-6 mb-3">
//                 <label className="font-weight-bold">Bus No:</label>
//                 <input
//                   type="text"
//                   onChange={(e) => setNumberplate(e.target.value)}
//                   className="form-control border border-primary rounded"
//                   placeholder="Enter bus number"
//                 />
//               </div>
//               <div className="col-md-6 mb-3">
//                 <label className="font-weight-bold">No of Seats In Bus:</label>
//                 <input
//                   type="number"
//                   onChange={(e) => setSeat(e.target.value)}
//                   className="form-control border border-primary rounded"
//                   placeholder="Enter seat number"
//                 />
//               </div>
//               <div className="col-md-6 mb-3">
//                 <label className="font-weight-bold">Contact Number:</label>
//                 <input
//                   type="text"
//                   onChange={(e) => setConnumber(e.target.value)}
//                   className="form-control border border-primary rounded"
//                   placeholder="Enter contact number"
//                 />
//               </div>
//               <div className="col-md-6 mb-3">
//                 <label className="font-weight-bold">Bus Type:</label>
//                 <select
//                   onChange={(e) => setCoach(e.target.value)}
//                   className="form-control border border-primary rounded"
//                 >
//                   <option>Bus type</option>
//                   <option>AC</option>
//                   <option>Non AC</option>
//                   <option>NonAC/AC</option>
//                 </select>
//               </div>
//             </div>
//             <div className="form-group text-center mb-3">
//               <label
//                 htmlFor="dropzone-file"
//                 className="btn btn-outline-primary btn-lg"
//               >
//                 Add Photos
//               </label>
//               <input
//                 id="dropzone-file"
//                 onChange={HandleImg}
//                 type="file"
//                 className="d-none"
//                 required
//               />
//               <p className="text-muted small">
//                 SVG, PNG, JPG or GIF (MAX. 800x400px)
//               </p>
//             </div>
//             <div className="form-group text-center mb-4">
//               <label
//                 htmlFor="dropzone-file1"
//                 className="btn btn-outline-primary btn-lg"
//               >
//                 Add Photos
//               </label>
//               <input
//                 id="dropzone-file1"
//                 onChange={HandleMultipleImg}
//                 type="file"
//                 multiple
//                 className="form-control-file border border-primary rounded"
//               />
//             </div>
//             <div className="text-center">
//               <button
//                 type="button"
//                 onClick={HandleUploadImg}
//                 className="btn btn-primary btn-lg btn-block mb-3"
//               >
//                 Submit
//               </button>
//               <div className="progress">
//                 <div
//                   className="progress-bar"
//                   role="progressbar"
//                   style={{ width: `${progress}%` }}
//                   aria-valuenow={progress}
//                   aria-valuemin="0"
//                   aria-valuemax="100"
//                 >
//                   {progress}%
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default AdminBusPage;

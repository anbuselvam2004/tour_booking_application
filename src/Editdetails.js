import React,{useState,useEffect} from "react";
import Nav from "./NavAdmin";
import { auth,Store,db } from "./config/firebase";
import { collection,query,where,getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { getDownloadURL, ref,uploadBytesResumable } from "firebase/storage";
import image from './images/bl.png';
import Footer from "./footall";

export default function Edit(){

    const [data,setdata]=useState([]);

    // const [link1,link2]=useState([]);
    const [id,setid]=useState("");
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

    let urlimg;
    let urlsimg=[];
    console.log(urlimg)
    console.log(urlsimg)
    useEffect(()=>{
        const fetchdetail=async()=>{
        const dat=auth.currentUser;
        if(!dat){
            window.alert("please login");
            return;
        }
        const em=dat.email;
        const docref=collection(db,'ImageUrl');
        const q = query(docref,where('email','==',em));
try{
        const querysnap=await getDocs(q);
        if(querysnap.empty){
            return <div>You have not upload bus</div>
        }
        else{    
        querysnap.forEach((element) => {
            setdata(element.data());
            setid(element.id);
            newname(element.data().busname)
        });
    }
    }
    catch(error){
        console.log(error);
    }
}
fetchdetail();
    })

    const HandleImg=(e)=>{
        setFile(e.target.files[0]);
    }
    const HandleMultipleImg=(e)=>{
        setMultipleFiles(Array.from(e.target.files));
    }


    const HandleUploadImg=()=>{
        
        // if (!validateForm()) {
        //     // If the form is not valid, return early to prevent further actions
        //     return;
        //   }


        const dat=auth.currentUser;
        if(dat.email===email){
        try{
        uploadSingle();
        //--------------------------------------------------------------
        //multiple images

      UploadMultiple();
        
      // await uploadUrl(urlimg,urlsimg);

      handle();

      // hist('/SucessUpload');
        }
        catch(error){
            console.error(error);
        }
    }
    else{
        window.alert("Please enter valid mail");
    }

      
        
       
    } 

const uploadSingle=()=>{
    
    if(!file){
        return;
    }
    
    const storageRef=ref(Store,`uploads/${file.name}`);
    const uploadtask=uploadBytesResumable(storageRef,file);

    uploadtask.on(
        "state_changed",(snapshot)=>{
            const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
            setprogress(progress);
            
        },
        (error)=>{
            window.alert("Upload failed");
            console.error(error);
        },
        ()=>{
            getDownloadURL(uploadtask.snapshot.ref).then((downloadurl1) =>{
                setdownloadurl(downloadurl1);
                 urlimg=downloadurl1;
                // uploadUrl(urlimg,downloadurls);
                console.log(downloadurl1);
                // geturl();
        });
        }
    );

}
const UploadMultiple=()=>{

    try{
    if(!multipleFiles.length){
        return
    }
    const uploadPromises=[];
    const urls=[];

    multipleFiles.forEach((file)=>{
        const storageRef=ref(Store,`uploads/multiple/${file.name}`);
        const uploadTask=uploadBytesResumable(storageRef,file);

        const uploadPromise=new Promise((resolve,reject)=>{
            uploadTask.on(
                "state_changed",
                (snapshot)=>{
                    const progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
                    setprogress(progress);
                },
                (error)=>{
                    console.error(error);
                    reject(error);
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
                        urls.push(url);
                        resolve(url);
                    })
                    .catch((error)=>{
                        console.error(error);
                        reject(error);
                    })
                }
            );
        });
        uploadPromises.push(uploadPromise);
    });
    Promise.all(uploadPromises)
    .then((urls)=>{
        setdownloadurls(urls);
        // uploadUrl(downloadurl,urls);
        console.log(urls);
        urlsimg=urls;
        
    })
    .catch((error)=>{
        console.error(error);
    })
}
catch(error){
    console.error(error);
}
}
    
console.log(id);


const uploadUrl=(child,multiple)=>{
    const UrlCollection=doc(db,"ImageUrl",id);

    try{
        updateDoc(UrlCollection,{
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

// const deletedoc=()=>{
//     const UrlCollection=doc(db,"ImageUrl",id);
//     try{
//         deleteDoc(UrlCollection);
//     }
//     catch(error){
//         console.error(error);
//     }

// }



const handle=()=>{
  console.log(downloadurl);
  console.log(downloadurls);

  uploadUrl(downloadurl,downloadurls);
}
    return(
        <div>
            <Nav/>
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
                    value={data.ownername}
                    onChange={(e) => newownername(e.target.value)}
                    className="form-control border border-primary rounded"
                    placeholder="Enter owner's name"
                  />

                </div>
                <div className="col-md-6 mb-3">
                  <label className="font-weight-bold">Bus Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => newname(e.target.value)}
                    className="form-control border border-primary rounded"
                    placeholder="Enter bus name"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="font-weight-bold">Email (used for login):</label>
                  <input
                    type="email"
                    value={data.email}
                    onChange={(e) => newemail(e.target.value)}
                    className="form-control border border-primary rounded"
                    placeholder="Enter bus email"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="font-weight-bold">Bus No:</label>
                  <input
                    type="text"
                    value={data.busnumber}
                    onChange={(e) => newnumberplate(e.target.value)}
                    className="form-control border border-primary rounded"
                    placeholder="Enter bus number"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="font-weight-bold"> No of Seats In Bus :</label>
                  <input
                    type="number"
                    value={data.Seats}
                    onChange={(e) => newseat(e.target.value)}
                    className="form-control border border-primary rounded"
                    placeholder="Enter RC number"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="font-weight-bold">Contact Number:</label>
                  <input
                    type="text"
                    value={data.contact}
                    onChange={(e) => newconnumber(e.target.value)}
                    className="form-control border border-primary rounded"
                    placeholder="Enter contact number"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="font-weight-bold">Bus Type:</label>
                  <select
                  value={data.coach}
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
             
                <input
                  id="dropzone-file1"
                  onChange={HandleMultipleImg}
                  type="file"
                  multiple
                  className="form-control-file border border-primary rounded"
                />
              </div>
              <div className="text-center">
                <div className="d-flex gap-3 justify-content-center">
                <button
                  type="button"
                  onClick={HandleUploadImg}
                  className="btn btn-primary text-black btn-lg btn-block mb-3"
                >
                  Submit
                </button>
                
                <button
                  type="button"
                  onClick={deleteDoc}
                  className="btn btn-primary text-black btn-lg btn-block mb-3"
                >
                  Remove Bus
                </button>
                </div>
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
}
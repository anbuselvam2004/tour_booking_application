import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './albums.css'; // Ensure this path is correct

import { db } from './config/firebase';
import { getDoc , doc} from 'firebase/firestore';

export default function App({child}) {
  console.log(child);
  const [slidesView, setSlidesView] = useState(window.innerWidth < 768 ? 1 : 4);
  const [modalImage, setModalImage] = useState(null);
  const [photos,setphotos]=useState([]);

  useEffect(() => {
    const handleResize = () => setSlidesView(window.innerWidth < 768 ? 1 : 4);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(()=>{
      const fetchphoto=async()=>{
        try{
          const photocollection=doc(db,'ImageUrl',child);
          const photosnap=await getDoc(photocollection);
          const photolist = photosnap.data().urls;
          setphotos(photolist);
          console.log(photolist);
        }
        catch(error){
          console.error(error);
        }
      }
      if(child){
      fetchphoto();
      }
  },[child]);

  const openModal = (imgSrc) => {
    setModalImage(imgSrc);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <>
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center bg-success" style={{ height: '60vh', padding: '20px 0' }}>
        {/* Heading Section */}
        <h2 className="text-center mb-4" style={{ color: '#333', fontWeight: 'bold', fontSize: '2rem' }}>
          Photo Gallery
        </h2>
        <div className="slides" style={{ width: '80%', maxWidth: '1200px' }}>
          <Swiper
            modules={[EffectCoverflow, Pagination, Navigation]}
            effect="coverflow"
            centeredSlides={true}
            slidesPerView={slidesView}
            loop={true}
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 150,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            className="mySwiper"
            style={{ padding: '20px 0' }}
          >
            {photos.map((photo,index)=>(
            <SwiperSlide key={index}>
              <img
                src={photo}
                alt="Slide 1"
                onClick={() => openModal(photo)}
                className="img-fluid fixed-size hover-effect"
              />
            </SwiperSlide>
            ))}
         
          
            {/* Add more slides as needed */}
          </Swiper>
        </div>
      </div>

      {/* Modal */}
      {modalImage && (
        <div
          className="modal fade show"
          style={{
            display: 'block',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1050,
          }}
          onClick={closeModal}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ backgroundColor: 'transparent', border: 'none' }}>
              <img src={modalImage} alt="Full size" style={{ width: '100%', height: 'auto', borderRadius: '5px' }} />
              <button
                onClick={closeModal}
                className="btn btn-light position-absolute top-0 end-0 m-2"
                style={{ zIndex: 1051 }}
              >
                &times;
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import React, { useState, useCallback, useRef, useEffect } from "react";
import { render } from "react-dom";
// import Gallery from "react-photo-gallery";
//import Carousel, { Modal, ModalGateway } from "react-images";
import { getUserPhotos } from "../../utils/api";
import { useParams } from "react-router-dom";
import noData from "../../images/noDataImage.png";

function UserPhoto() {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [photo, setPhoto] = useState([]);

  useEffect(() => {
    getUserPhotos(id)
      .then((res) => {
        console.log(res.data);
        const picture = res.data?.photos.map((pho) => {
          console.log(pho.fileName);
          return {
            src: `https://backend.ourlifepartner.com/uploadedFiles/photos/${pho.fileName}`,
            width: 4,
            height: 3,
          };
        });
        setPhoto(picture);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [photo]);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const photos = [
    {
      src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
      width: 4,
      height: 3,
    },
    {
      src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
      width: 1,
      height: 1,
    },
    {
      src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
      width: 3,
      height: 4,
    },
    {
      src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
      width: 3,
      height: 4,
    },
    {
      src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
      width: 3,
      height: 4,
    },
    {
      src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
      width: 4,
      height: 3,
    },
    {
      src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
      width: 3,
      height: 4,
    },
    {
      src: "https://source.unsplash.com/PpOHJezOalU/800x599",
      width: 4,
      height: 3,
    },
    {
      src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
      width: 4,
      height: 3,
    },
  ];

  return (
    <div>
      {photo.length > 0 ? (
        <>
          {/* <Gallery photos={photo} onClick={openLightbox} /> */}
          {/* <ModalGateway>
            {viewerIsOpen ? (
              <Modal onClose={closeLightbox}>
                <Carousel
                  currentIndex={currentImage}
                  views={photo.map((x) => ({
                    ...x,
                    srcset: x.srcSet,
                    caption: x.title,
                  }))}
                />
              </Modal>
            ) : null}
          </ModalGateway>*/}
        </>
      ) : (
        <div className="w-full h-[25vh] flex justify-center items-center rounded-xl ">
          <div className="w-[100px] h-[100px] md:w-[150px]  md:h-[150px]  relative">
            <img
              src={noData}
              alt=""
              className="w-full h-full object-contain object-center"
            />
            <span className="absolute bottom-0 lg:bottom-5 left-[20%] lg:left-[30%] font-semibold  ">
              No Data
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserPhoto;

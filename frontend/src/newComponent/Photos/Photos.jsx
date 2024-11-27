import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useContext,
} from "react";
import { render } from "react-dom";
// import Gallery from "react-photo-gallery";
//import Carousel, { Modal, ModalGateway } from "react-images";
import { deletePhoto, getPhotos, uploadPhotos } from "../../utils/api";
import { AuthContext } from "../../utils/context/AuthContext";
import noData from "../../images/noDataImage.png";
// import { PhotoAlbum } from "react-photo-album";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { AiOutlineDelete } from "react-icons/ai";
import { Badge, Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import "./photo.css";
import SinglePhoto from "./SinglePhoto";
import { BsFillPatchPlusFill, BsFillPlusCircleFill } from "react-icons/bs";

function Photos() {
  const fileInputRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [photo, setPhoto] = useState([]);
  const {user, setUser} = useContext(AuthContext);
  const [index, setIndex] = useState(-1);
  const [hover, setHover] = useState(false);



  const openDeleteModal = (id) => {
    modals.openConfirmModal({
      title: "Delete Photo",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete Photo? This action is will delete
          photo and will be no longer available.
        </Text>
      ),
      labels: { confirm: "Delete Photo", cancel: "No don't delete it" },
      confirmProps: { color: "red", variant: "outline" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handlePhotoDelete(id),
    });
  };

  useEffect(() => {
    // getPhotos().then((res) => {
    //   if(res.data.length > 0) {
    //   const picture = res.data.map((pho) => {
    //     console.log(pho.fileName);
    //      return {
    //         src: `http://localhost:3000/photos/${pho.fileName}`,
    //         width: 4,
    //         height: 3,
    //      }
    //   })
    if (user && user.photos) {
      const picture = user.photos.map((pho, ind) => {
        return {
          key: ind,
          id: pho.id,
          src: `${pho.url}`,
          width: 800,
          height: 600,
        };
      });
      console.log(picture);
      setPhoto(picture);
    }
  }, [user]);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const handleProfileClick = () => {
    if (fileInputRef) {
      fileInputRef.current.click();
    }
  };

  const handleFileAdd = async (files) => {
    const formData = new FormData();
    console.log(typeof files);
    files &&
      [...files].forEach((file) => {
        formData.append("photos", file);
      });

    try {
      uploadPhotos(formData).then((res) => {
        console.log(res.data);
        console.log(user);
        setUser({ ...user, photos: [...user.photos, ...res.data] });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    console.log(e.target.files);
    const { files } = e.target;
    if (!files) return;
    handleFileAdd(files);
  };

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const photos = [
    {
      src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
      width: 400,
      height: 300,
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

  const photoStyles = {
    width: "200px",
    height: "200px",
    margin: "10px",
  };

  const handlePhotoDelete = (photoId) => {
    deletePhoto(photoId)
      .then((res) => {
        console.log(res);

        setUser({ ...user, photos: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className=" w-[90%] lg:w-[100%] mx-auto">
      <div className="w-full flex flex-row-reverse  gap-2 items-center justify-start mb-4 ">
        {!(photo.length >= 10) && (
          <Button
            variant="filled"
            rightIcon={<BsFillPlusCircleFill size={20} color="white" />}
            onClick={(e) => handleProfileClick(e)}
            className="bg-[#EB4566] px-2"
          >
            Add photo
          </Button>
        )}

        <Badge
          size="xl"
          radius={5}
          style={{ backgroundColor: "white", color: "black" }}
        >
          {`${photo.length}/10`}
        </Badge>
      </div>
      <div>
        <input
          type="file"
          ref={fileInputRef}
          className="d-none"
          accept="image/*"
          multiple
          onChange={(e) => handleFileChange(e)}
        />
      </div>
      {photo.length > 0 ? (
        <>
          <Lightbox
            open={index >= 0}
            index={index}
            close={() => setIndex(-1)}
            slides={photo}
          />

          <div className="w-full h-full flex flex-col gap-2  md:flex-row flex-wrap">
            {photo.map((pho, index) => {
              return (
                <SinglePhoto
                  id={pho.id}
                  openDeleteModal={openDeleteModal}
                  key={index}
                  index={index}
                  setIndex={setIndex}
                  src={pho.src}
                />
              );
            })}
          </div>
        </>
      ) : (
        <div className="w-full h-[25vh] flex justify-center items-center rounded-xl ">
          <div className="w-[100px] h-[100px] md:w-[150px]  md:h-[150px]  relative">
            <img src={noData} alt="" className="w-full h-full object-contain" />
            <span className="absolute bottom-5 left-[30%] font-semibold  ">
              No Data
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Photos;

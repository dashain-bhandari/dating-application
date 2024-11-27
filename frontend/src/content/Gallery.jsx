import OwlCarousel from "react-owl-carousel";
import "../styles/Gallery.css";
import { useState } from "react";
import Model from "./Model";

const data = [
  {
    link: "https://newsmeter.in/h-upload/2021/11/15/308407-puerto-rico-beautiful-women.webp",
  },
  {
    link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkpski28UIpdGwwhVRqDbpeMh3YRqekbMkeg&usqp=CAU",
  },
  {
    link: "https://newsmeter.in/h-upload/2021/11/15/308407-puerto-rico-beautiful-women.webp",
  },
  {
    link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkpski28UIpdGwwhVRqDbpeMh3YRqekbMkeg&usqp=CAU",
  },
  {
    link: "https://newsmeter.in/h-upload/2021/11/15/308407-puerto-rico-beautiful-women.webp",
  },
  {
    link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkpski28UIpdGwwhVRqDbpeMh3YRqekbMkeg&usqp=CAU",
  },
  {
    link: "https://newsmeter.in/h-upload/2021/11/15/308407-puerto-rico-beautiful-women.webp",
  },
  {
    link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkpski28UIpdGwwhVRqDbpeMh3YRqekbMkeg&usqp=CAU",
  },
  {
    link: "https://newsmeter.in/h-upload/2021/11/15/308407-puerto-rico-beautiful-women.webp",
  },
  {
    link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkpski28UIpdGwwhVRqDbpeMh3YRqekbMkeg&usqp=CAU",
  },
];
const Gallery = () => {
  const [clickedImg, setClickedImg] = useState(null);
  const [currentIndex, setcurrentIndex] = useState(null);
  const [bodyClassName, setBodyClassName] = useState("");

  const handleClick = (item, index) => {
    setcurrentIndex(index);
    setClickedImg(item.link);
    setBodyClassName("body-class");
  };

  const handleRotationRight = () => {
    const totalLength = data.length;
    if (currentIndex + 1 >= totalLength) {
      setcurrentIndex(0);
      const newurl = data[0].link;
      setClickedImg(newurl);
      return;
    }
    const newIndex = currentIndex + 1;
    const newurl = data.filter((item) => {
      return data.indexOf(item) === newIndex;
    });
    const newItem = newurl[0].link;
    setClickedImg(newItem);
    setcurrentIndex(newIndex);
  };
  return (
    <>
      <div className="gallery mt-3">
        <div className="galleryright">
          <div className="grimg">
            <div className="grid1">
              <OwlCarousel
                className="owl-theme"
                items={2}
                autoplay
                autoplayTimeout={2000}
                autoplaySpeed={500}
                loop
              >
                {data.map((item, index) => (
                  <div className="item image">
                    <div className="image" key={index}>
                      <img
                        src={item.link}
                        alt=""
                        onClick={() => handleClick(item, index)}
                      />
                    </div>
                  </div>
                ))}
              </OwlCarousel>

              {clickedImg && (
                <Model
                  clickedImg={clickedImg}
                  handleRotationRight={handleRotationRight}
                  setClickedImg={setClickedImg}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;

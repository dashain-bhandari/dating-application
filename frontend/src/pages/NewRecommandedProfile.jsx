import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../utils/context/AuthContext";
import { fetchRecommendThunk } from "../Store/thunk/recommendThunk";
import profileAvatar from "../images/olp_avatar.avif";
import { addToast } from "../Store/features/toastSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function NewRecommandedProfile() {
  const [showRecommend, setShowRecommend] = useState(true);
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [color, setColor] = useState("var(--primary)");
  const { recommendUser, filteredRecommendUser, loading } = useSelector(
    (state) => state.recommend
  );
  const [recommendedUser, setRecommendedUser] = useState([]);
  const [filterUser, setFilterUser] = useState([]);

  useEffect(() => {
    dispatch(fetchRecommendThunk());
  }, [dispatch]);

  useEffect(() => {
    setRecommendedUser(recommendUser);
    setFilterUser(filteredRecommendUser);
  }, [recommendUser, filteredRecommendUser]);

  const profilesToShow = filterUser.length > 0 ? filterUser : recommendedUser.slice(0, 4);

  const handleView = (id) => {
    if (
      (user &&
        user.profiles &&
        (user.profiles.length <= 20 || user.profiles.includes(id))) ||
      (user && !user.profiles)
    ) {
      navigate(`/home/main/profile/${id}/about`);
    } else {
      console.log("restrict!");
    }
  };

  const onViewProfile = async (id) => {
    if (!user.subscription || user?.subscription?.status === "expired") {
      if (!user.profiles || user.profiles?.length < 2 || user.profiles?.includes(id)) {
        navigate(`/home/main/profile/other/${id}/about`);
      } else {
        dispatch(addToast({ kind: "ERROR", msg: "View limit exceeded on free version." }));
      }
    } else {
      navigate(`/home/main/profile/other/${id}/about`);
    }
  };

  const calculateAge = (birthYear) => {
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          // dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      {loading ? (
        <div className="w-full flex justify-center items-center">
          <ClipLoader
            color={color}
            loading={loading}
            cssOverride={{}}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>
          {profilesToShow.length > 0 && (
            <div className="p-2">
              <h1 className="text-base font-medium pb-4">
                Recommended Profiles
              </h1>
             <div className='slider-container my-4 mx-2'>
             <Slider {...settings} className="max-w-[68em] relative">
                {profilesToShow.map((item, index) => (
                  <div key={index} className="relative group rounded h-52 w-full cursor-pointer px-4">
                    <div className="h-full w-full rounded-xl brightness-75">
                      <img
                        src={
                          item.avatarId
                            ? `${import.meta.env.VITE_BASE_URL}/user-avatar/${item.avatarId}`
                            : profileAvatar
                        }
                        alt={item?.name}
                        className={`h-full w-full object-cover object-top rounded-xl ${
                          user?.viewProfilePaymentStatus ? "" : ""
                        }`}
                      />
                    </div>
                    <div className="absolute -translate-x-1/2 left-1/2 bottom-6 z-10 flex flex-col justify-center w-full items-center ">
                      <div>
                        <button
                          className="px-6 py-2 rounded-3xl border-[1px] border-red-500 text-white
                            hidden group-hover:block transition-all duration-500 ease-in-out"
                          onClick={() => onViewProfile(item?.id)}
                        >
                          View Profile
                        </button>
                      </div>
                      <h1
                        className="text-base font-semibold text-white group-hover:opacity-0 transition-all 
                        duration-500 ease-in-out"
                      >
                        {item?.fullname}
                      </h1>
                      <div
                        className="flex gap-8 justify-between text-sm font-medium text-gray-200 group-hover:opacity-0 transition-all 
                        duration-500 ease-in-out"
                      >
                        <span>{calculateAge(item?.year)} Years</span>
                        <span className="">{item?.address}</span>
                      </div>
                    </div>
                   
                  </div>
                ))}
              </Slider>
             </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

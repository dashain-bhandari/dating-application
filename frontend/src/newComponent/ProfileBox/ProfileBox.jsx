import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { VscDeviceCamera } from "react-icons/vsc";
import { AuthContext } from "../../utils/context/AuthContext";
import profileAvatar from "../../images/olp_avatar.avif";
import Search from "../../pages/InnerHome/InnerHeader/Search";
import { AiFillFilter } from "react-icons/ai";

function ProfileBox({ showFilter, setShowFilter }) {
  const [imageUrl, setImageUrl] = useState(null);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    // console.log(user);
    if (!imageUrl) {
      setImageUrl("https://www.caltrain.com/files/images/2021-09/default.jpg");
    }
  }, []);

  console.log(user);

  return (
    <div className="w-full flex lg:hidden justify-around lg:justify-center items-center bg-white md:mb-2 outline-none border-t-2 border-[rgba(0,0,0,0.2)]">
      <div className="w-[90%] mx-auto flex justify-center items-center mt-4">
        <div className="relative w-[50px] h-[50px]  md:w-[70px] md:h-[70px] rounded-full my-2">
          <img
            src={
              user && user.avatarId
                ? `${import.meta.env.VITE_BASE_URL}/user-avatar/${
                    user && user.avatarId
                  }`
                : profileAvatar
            }
            alt=""
            className="w-full h-full rounded-full object-cover object-center"
          />
          {/* <span className='absolute right-0 bottom-0'><VscDeviceCamera size={30} /></span> */}
        </div>

        <div className="md:w-[80%] mx-auto flex flex-col justify-center md:items-center mt-2 ml-3 md:ml-0">
          {/* <h3 className='text-md font-semibold lg:text-lg xl:text-xl'>{user && user.username}</h3> */}
          {/* <h4 className='text-md font-semibold lg:text-sm'>{user && user.email}</h4> */}
          {/* <h4  className='text-md lg:text-lg'>{user && user.id}</h4> */}
          <Search />
        </div>

        <div className="ml-6" onClick={() => setShowFilter(!showFilter)}>
          <AiFillFilter size={25} color="var(--secondary)" />
        </div>
      </div>
    </div>
  );
}

export default ProfileBox;

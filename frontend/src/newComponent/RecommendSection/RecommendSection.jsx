import React, { useState } from "react";
import RecommendItem from "./RecommendItem";
import { useContext } from "react";
import { AuthContext } from "../../utils/context/AuthContext";
import { RiArrowDownSFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import noData from "../../images/noDataImage.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { fetchRecommendThunk } from "../../Store/thunk/recommendThunk";
import NewProfileCard from "../newProfileCard/NewProfileCard";
import CardSkeleton from "../../components/Skeleton/CardSkeleton";
import { Skeleton } from "@mantine/core";


function RecommendSection() {
  const [showRecommend, setShowRecommend] = useState(true);
  const {user} = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recommendItem = [1, 2, 3, 4, 5, 6, 7, 8, 9, 20];
  const [color, setColor] = useState("var(--primary)");
  const { recommendUser, filteredRecommendUser, loading } = useSelector(
    (state) => state.recommend
  );
  const [recommendedUser, setRecommendedUser] = useState([]);
  const [filterUser, setFilterUser] = useState([]);
  console.log(recommendUser)
  useEffect(() => {
   if(user){
    dispatch(fetchRecommendThunk());
   }
  }, [user]);

  useEffect(() => {
    setRecommendedUser(recommendUser);
    setFilterUser(filterUser);
  }, [recommendUser, filteredRecommendUser]);

  console.log(recommendUser, filteredRecommendUser);
  console.log(loading)


  return (<>
    {loading ? (<>
      <div className="w-screen h-screen flex justify-center items-center">
        <ClipLoader
          color={color}
          loading={loading}
          cssOverride={{}}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </>) : (<>
      <div
        className={`mx-3 mt-6 mb-3 rounded-xl  flex flex-col px-2 py-2 lg:min-h-[80vh]`}
      >
        {filterUser.length > 0 || recommendedUser.length > 0 ? (
          <>
            <div
              className="py-2 px-2 flex justify-between"
              onClick={() => setShowRecommend((prev) => !prev)}
            >
              <h3 className=" text-xl mb-2  font-semibold text-[rgba(0,0,0,0.8)]">
                People you may be interested in
              </h3>
            </div>
            <div
              className={`grid grid-cols-1 lg:mt-4 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-4 transition-all duration-500 overflow-hidden ${showRecommend ? "h-full" : "h-0"
                }`}
            >
              {filterUser.length > 0
                ? filterUser.map((recommend, index) => {
                  return <NewProfileCard key={index} recommend={recommend} />;
                })
                : recommendedUser.map((recommend, index) => {
                  return <NewProfileCard key={index} recommend={recommend} />;
                })}
            </div>
          </>
        ) : (
          <div className="w-full h-[80vh] flex justify-center items-center rounded-xl ">
            <div className="w-[100px] h-[100px] md:w-[150px]  md:h-[150px]  relative">
              <img src={noData} alt="" className="w-full h-full object-contain" />
              <span className="absolute bottom-0 left-[20%] md:left-[30%] md:bottom-5 lg:bottom-8 lg:left-[32%] lg:text-lg font-semibold  ">
                No Data
              </span>
            </div>
          </div>
        )}
      </div>
    </>)}
  </>

  );
}

export default RecommendSection;

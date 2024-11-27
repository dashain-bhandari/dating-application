import React from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import RecommendItem from "../newComponent/RecommendSection/RecommendItem";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../utils/context/AuthContext";
import { RiArrowDownSFill } from "react-icons/ri";
import noData from "../images/noDataImage.png";
import { ClipLoader } from "react-spinners";
import { useEffect } from "react";
import {
  addMoreSearchUserThunk,
  fetchSearchUserThunk,
} from "../Store/thunk/searchUserThunk";
import { Link, useParams } from "react-router-dom";
import NewProfileCard from "../newComponent/newProfileCard/NewProfileCard";

function SearchResultSection() {
  const [showRecommend, setShowRecommend] = useState(true);
  const {user} = useContext(AuthContext);
  const [color, setColor] = useState("var(--primary)");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(20);
  const [initial, setInitial] = useState(true);
  const { result, filteredResult, loading } = useSelector(
    (state) => state.search
  );
  console.log(filteredResult);
  const dispatch = useDispatch();
  const { name } = useParams();
  console.log(name, "name")

  useEffect(() => {
    if (!initial) {
      dispatch(addMoreSearchUserThunk({ value: name, page, limit }));
    }
  }, [page]);

  const handleLoadMore = () => {
    setInitial(false);
    setPage((prev) => prev + 1);
  };

 
  return (<>
  {loading?(<>
    <div className="w-full h-screen flex justify-center items-center">
        <ClipLoader
          color={color}
          loading={loading}
          cssOverride={{}}
          size={75}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
  </>):(<><div className=" lg:mx-3 lg:my-3 rounded-xl mt-2 mb-2 lg:mt-4 flex flex-col min-h-[75vh] lg:min-h-[100vh] px-2 py-2 bg-light">
      <Link to={`/home/main/dashboard`} className="underline mt-4 cursor-pointer text-[var(--secondary)]">
        Clear
      </Link>
      <div
        className="py-2 px-2 flex justify-between"
        onClick={() => setShowRecommend((prev) => !prev)}
      >
        <h3 className="text-xl xl:text-xl font-bold pl-2">{`${result.length} search results found.`}</h3>

        <div className="flex gap-4">
          {/* <span className=''><RiArrowDownSFill size={25} /></span> */}
        </div>
      </div>
      {result.length > 0 || filteredResult.length > 0 ? (
        <>
          <div
            className={`px-3 py-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-4 transition-all duration-500 overflow-hidden ${
              showRecommend ? "h-full" : "h-0"
            }`}
          >
            {filteredResult.length > 0
              ? filteredResult.map((recommend, index) => {
                  return (
                    <RecommendItem
                      key={index}
                      recommend={recommend}
                      type={"filteredResult"}
                    />
                  );
                })
              : result.map((recommend, index) => {
                  return (
                    <NewProfileCard
                      key={index}
                      recommend={recommend}
                      type={"searched"}
                    />
                  );
                })}
          </div>

          {result && result.length % 20 === 0 && (
            <div className="w-full flex justify-center items-center rounded-3xl">
              <button
                onClick={() => handleLoadMore()}
                className="px-4 py-2 rounded-3xl border-2 border-[var(--secondary)] hover:text-[var(--primary)]"
              >
                See More
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-[80vh] flex justify-center items-center rounded-xl ">
          <div className="w-[100px] h-[100px] md:w-[150px]  md:h-[150px]  relative">
            <img src={noData} alt="" className="w-full h-full object-contain" />
            <span className="absolute bottom-0 lg:bottom-5 left-[20%] md:left-[30%] lg:left-[30%] font-semibold  ">
              No Data
            </span>
          </div>
        </div>
      )}
    </div></>)}
  </>
    
  );
}

export default SearchResultSection;

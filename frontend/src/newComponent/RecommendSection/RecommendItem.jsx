import React, { useContext } from "react";
import profileAvatar from "../../images/olp_avatar.avif";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createConnectionRequestThunk } from "../../Store/thunk/connectionsThunk";
import { AuthContext } from "../../utils/context/AuthContext";
import ConnectionRequestSection from "../../Section/connectionRequestSection";
import { createConnectionRequest } from "../../utils/api";
import { addToast } from "../../Store/features/toastSlice";
import { addConnectionRequest } from "../../Store/features/connectionSlice";
import { AgeFromDate } from "age-calculator";
import { useState } from "react";
import { changeIsPending } from "../../Store/features/searchUser";
import { Lock } from 'lucide-react';

function RecommendItem(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);
  console.log(user)
  const [monthToNum, setMonthtoNum] = useState({
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  });
console.log(props.recommend)
  const sendConnectionRequest = () => {
    console.log(user.id, props.recommend.id);
    createConnectionRequest(props.recommend.id)
      .then((res) => {
        dispatch(addConnectionRequest(res.data));
        dispatch(
          addToast({ kind: "SUCCESS", msg: "Request Sent Successfully." })
        );
        dispatch(changeIsPending({ id: props.recommend.id, type: props.type }));
      })
      .catch((error) => {
        console.log(error);
        dispatch(addToast({ kind: "ERROR", msg: "Cannot send request" }));
      });
  };

  const onViewProfile=async(id)=>{
    console.log("hii")
        if(!user.subscription || user?.subscription?.status=="expired"){
    if(!user.profiles || user.profiles?.length<2  || user.profiles?.includes(id)){
      navigate(`/home/main/profile/other/${id}/about`)
    }
    else{
      console.log("hii")
      dispatch(addToast({ kind: "ERROR", msg: "View limit exceeded on free version." }))
    }
        }
        else{
          navigate(`/home/main/profile/other/${id}/about`)
        }
      }

      
  return (
    // <Link to={`/home/profile/${recommend.id}`}>
    <div className="rounded-lg bg-white overflow-hidden shadow-md">
      <div className="w-full h-[250px] overflow-hidden">
        <img
          className={`w-full h-full object-cover object-center ${user?.viewProfilePaymentStatus?"":"blur-sm"}`}
          src={
            props.recommend.avatarId
              ? `${import.meta.env.VITE_BASE_URL}/user-avatar/${
                  props.recommend.avatarId
                }`
              : profileAvatar
          }
          alt=""
        />
      </div>

      <div className="flex flex-col px-2 py-2">
        <h1
          style={{ textTransform: "capitalize" }}
          className="text-center text-[1.5rem] font-[500] my-2"
        >
          {props.recommend.fullname}
        </h1>
        <div className="w-full flex justify-between px-2">
          <span className="text-md font-[500]">
            {
              new AgeFromDate(
                new Date(
                  props.recommend.year,
                props.recommend.month,
                  props.recommend.day
                )
              ).age
            }
          </span>
          <span className="text-md font-[500]">{props.recommend.height}</span>
        </div>

        <div className="w-full flex justify-between px-2">
          <span
            style={{ textTransform: "capitalize" }}
            className="text-md font-[500]"
          >{`${props.recommend.religion}, ${props.recommend.caste}`}</span>
          <span
            style={{ textTransform: "capitalize" }}
            className="text-md font-[500]"
          >{`${props.recommend.occupation}`}</span>
        </div>

        <div className="w-full flex justify-between mt-2 mb-2">
          <button
            className="px-2 py-2 w-full rounded-xl mr-1 text-md text-white bg-[#E61A52] font-semibold"
            onClick={() =>
              // navigate(`/home/main/profile/${props.recommend.id}/about`)
              onViewProfile(props.recommend.id)
            }
          >
            View Profile
          
          </button>
          {props.recommend.isConnected ? (
            <button className="px-2 py-2 w-full rounded-xl text-md border-[2px] border-[var(--secondary)] font-semibold hover:text-primary">
              Connected
            </button>
          ) : (
            <>
              {props.recommend.isPending ? (
                <button className="px-2 py-2 w-full rounded-xl text-md border-[2px] border-[var(--secondary)] bg-[var(--secondary)] text-white font-semibold hover:text-primary">
                  Pending
                </button>
              ) : (
                <button
                  className="px-2 py-2 w-full rounded-xl text-md border-[2px] border-[var(--secondary)] bg-[var(--secondary)] text-white font-semibold hover:text-primary"
                  onClick={() => sendConnectionRequest()}
                >
                  Connect
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
    // </Link>
  );
}

export default RecommendItem;

import React from "react";
import { useEffect } from "react";
import { verifyEmail } from "../../utils/api";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToast } from "../../Store/features/toastSlice";
import { useState } from "react";
import { axiosInstance } from "../../http";

function VerifyEmail() {
  const { resetToken } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);

    console.log("verify Email");
    axiosInstance
      .get(
        `/authentication/email/verify/${resetToken}?userId=${searchParams.get(
          "userId"
        )}`
      )
      .then((res) => {
        setLoading(false);
        const user = res.data;
        console.log(res.data);
        if (user && !user.profile) {
          navigate("/profile/info");
        } else if (user && !user.family) {
          navigate("/profile/info");
        } else if (user && !user.education) {
          navigate("/profile/info");
        } else if (user && !user.preferance) {
          navigate("/profile/info");
        } else {
          navigate("/home/dashboard");
        }
        dispatch(
          addToast({ kind: "SUCCESS", msg: "Email verified successfully." })
        );
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        navigate("/resend/email");
        dispatch(
          addToast({
            kind: "ERROR",
            msg: "The link might have expired. Send another email.",
          })
        );
      });
  }, []);

  return <div></div>;
}

export default VerifyEmail;

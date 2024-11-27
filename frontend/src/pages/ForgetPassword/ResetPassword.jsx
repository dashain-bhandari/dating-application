import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToast } from "../../Store/features/toastSlice";
import Input from "../../newComponent/Profile/Input";
import { resetPassword } from "../../utils/api";

function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const { token } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.newPassword || !values.confirmPassword) {
      return dispatch(
        addToast({ kind: "ERROR", msg: "Please provide email." })
      );
    }
    console.log("submitting form");
    resetPassword(values, token)
      .then((res) => {
        dispatch(
          addToast({ kind: "SUCCESS", msg: "Password reset successfully." })
        );
        setValues({
          newPassword: "",
          confirmPassword: "",
        });
        navigate("/home/dashboard");
      })
      .catch((error) => {
        console.log(error);
        dispatch(addToast({ kind: "ERROR", msg: "Failed to resend email." }));
        navigate("/password/forget");
      });
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-screen">
      <div className="flex flex-col w-[60%] bg-white px-4 py-4 rounded-xl shadow-md">
        <h3 className="text-center font-bold my-2 md:text-2xl">
          Reset Password
        </h3>
        {/* <p className='font-semibold'>A link has been sent to your email. Please check the inbox after submitting.</p> */}
        {/* <p className='font-semibold'>Note: Email must be associated with your account</p> */}

        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <Input
            value={values.newPassword}
            onChange={(e) =>
              setValues({ ...values, newPassword: e.target.value })
            }
            name="newPassword"
            classes2=" "
            classes="px-2 outline-none border-2 border-[rgba(0, 0, 0, 0.9)]"
            label="Enter New Password"
            placeholder="New Password"
            type="password"
          />

          <Input
            value={values.confirmPassword}
            onChange={(e) =>
              setValues({ ...values, confirmPassword: e.target.value })
            }
            name="confirmPassword"
            classes2=" "
            classes="px-2 outline-none border-2 border-[rgba(0, 0, 0, 0.9)]"
            label="Confirm New Password"
            placeholder="Confirm Password"
            type="password"
          />

          <div className="w-full flex justify-end">
            {/* <button className='px-8 mx-2 my-2 py-2 rounded-lg bg-[var(--secondary)] text-white font-semibold hover:text-[var(--primary)]' onClick={() => navigate('/login')}>Go Back</button> */}
            <button
              type="submit"
              className="px-8 py-2 mx-2 my-2 rounded-lg bg-[var(--primary)] text-white font-semibold hover:text-[var(--secondary)]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;

import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToast } from "../../Store/features/toastSlice";
import Input from "../../newComponent/Profile/Input";
import { forgotPassword } from "../../utils/api";

function ForgetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.email) {
      return dispatch(
        addToast({ kind: "ERROR", msg: "Please provide email." })
      );
    }
    console.log("submitting form");
    forgotPassword(values)
      .then((res) => [
        dispatch(
          addToast({ kind: "SUCCESS", msg: "Email resent successfully." })
        ),
      ])
      .catch((error) => {
        console.log(error);
        dispatch(addToast({ kind: "ERROR", msg: "Invalid Email!" }));
      });
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-screen">
      <div className="flex flex-col w-[60%] bg-white px-4 py-4 rounded-xl shadow-md">
        <h3 className="text-center font-bold my-2 md:text-2xl">
          Recover Account
        </h3>
        <p className="font-semibold">
          A link has been sent to your email. Please check the inbox after
          submitting.
        </p>
        <p className="font-semibold">
          Note: Email must be associated with your account
        </p>

        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <Input
            value={values.email}
            onChange={(e) => setValues({ email: e.target.value })}
            name="email"
            classes2="font-semibold mt-3"
            classes="px-2 outline-none border-2 border-rgba(0, 0, 0, 0.4)"
            label="Email Address"
            placeholder="Enter your email"
            type="email"
          />

          <div className="w-full flex justify-end">
            <button
              className="px-8 mx-2 my-2 py-2 rounded-lg bg-[var(--secondary)] text-white font-semibold hover:text-[var(--primary)]"
              onClick={() => navigate("/login")}
            >
              Go Back
            </button>
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

export default ForgetPassword;

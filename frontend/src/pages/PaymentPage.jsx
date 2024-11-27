import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import ringLogo from "../images/doubleRing.png";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../http";
import { AuthContext } from "../utils/context/AuthContext";
import Footer from "../components/Footer";
import { IoChevronBackCircle } from "react-icons/io5";


export default function PaymentPage() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  console.log(user);
  const openPopup = (pkg) => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setSelectedPackage(null);
  };

  const [processId, setProcessId] = useState("");
  const [MerchantTxnId, setMerchantTxnId] = useState("");

  const buy = async (pkg) => {
    setSelectedPackage(pkg);
    if (user && pkg) {
      const amount = pkg.price;
      console.log(amount);
      const mid =
        user.id +
        pkg.duration +
        Math.floor(100 + Math.random() * 900).toString();
      console.log(mid);

      setMerchantTxnId(mid);

      const { data } = await axiosInstance.post("/payment/processId", {
        MerchantTxnId: mid,
        Amount: amount,
      });

      console.log(data);

      if (data.data && data.data.ProcessId) {
        setProcessId(data.data.ProcessId);
      }
      if (data.error) {
        console.log(data.error);
      }
      setPopupOpen(true);
    }
  };

  useEffect(() => {
    console.log(processId);
  }, [processId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = document.getElementById("form");
    form.target = "_blank";

    form.submit();
  };

  return (
    <div>
      <Header />
      <div className="md:px-20 px-2 sm:py-[8rem] py-[5rem] bg-light">
      <div className="absolute sm:hidden">
          <Link to="/home/main/dashboard" className="text-xl"><IoChevronBackCircle /></Link>
          </div>
        <div className="flex flex-col items-center p-4 space-y-4  h-full">
          
            <div>
               <h2 className="text-2xl font-semibold">Upgrade your Plan for more Features</h2>
               <p className="text-gray-500 text-sm font-medium flex justify-center items-center  sm:whitespace-nowrap">
                 We've got a pricing plan that's perfect for you
                </p>
            </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4  pt-10">
            {packages.map((pkg,index) => (
              <div key={index}  className="cursor-pointer max-w-xs p-6 bg-white rounded-2xl shadow-sm hover:drop-shadow-md w-60">
                <p className="text-[12px] text-center text-[#e61a52]">PACKAGE</p>
                <h2 className="text-l text-center py-2 px-4 mx-auto w-fit font-semibold my-2 bg-[#36365c] text-white shadow-md rounded-3xl">
                  {pkg.duration} {pkg.duration > 1 ? "months" : "month"}
                </h2>
                <p className="text-2xl text-center font-bold my-4 text-[#e61a52]">
                  Rs. {pkg.price}
                </p>
                <p className="text-gray-500 text-center text-sm md:py-3 py-1">{pkg.desc}</p>
               <div className="flex justify-center -mb-10">
               <button
                  className="px-3 py-2 bg-[#e61a52] hover:bg-[#8b50b8] text-white rounded-full text-sm"
                  onClick={() => buy(pkg)}
                >
                  Upgrade Plan
                </button>
               </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Popup
        open={popupOpen}
        onClose={closePopup}
        modal
        closeOnDocumentClick={true}
        contentStyle={{
          padding: 30,
          borderRadius: 20,
          maxWidth: "fit-content",
        }}
        position="center center"
      >
        <div>
          <div className=" text-[#cf2c3d] font-bold text-xl flex justify-center items-center text-centr ">
            <span>
              <img src={ringLogo} alt="ringLogo" />
            </span>
            <span>Our Life Partner</span>
          </div>
          <div className="w-full flex justify-center items-center">
            <div className="w-full">
              <form
                className="w-full"
                method="post"
                action="https://gatewaysandbox.nepalpayment.com/Payment/Index"
                     // action="https://gateway.nepalpayment.com/payment/index "
                id="form"
                onSubmit={handleSubmit}
              >
                <input
                  id="MerchantId"
                  type="hidden"
                  name="MerchantId"
                  value="7366"
                />
                <input
                  id="MerchantName"
                  type="hidden"
                  name="MerchantName"
                  value="socialnepalapi"
                />
                <input
                  id="MerchantTxnId"
                  type="hidden"
                  name="MerchantTxnId"
                  value={MerchantTxnId}
                />
                <input
                  id="Amount"
                  type="hidden"
                  name="Amount"
                  value={selectedPackage?.price}
                />
                <input
                  id="ProcessId"
                  type="hidden"
                  name="ProcessId"
                  value={processId}
                />
                <input
                  id="InstrumentCode"
                  type="hidden"
                  name="InstrumentCode"
                  value="TMBANK"
                />
                <input
                  id="TransactionRemarks"
                  type="hidden"
                  name="TransactionRemarks"
                  value="test checkout gateway"
                />
                <div className="flex w-full justify-center items-center">
                  <button
                    disabled={!MerchantTxnId || !processId || !selectedPackage}
                    className="bg-[#7C4BA1] hover:bg-[#9554c7] text-white px-4 py-2 rounded flex justify-center items-center"
                    type="submit"
                  >
                    Pay
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Popup>
      <Footer/>
    </div>
  );
}

const packages = [
  { duration: 1, price: 500,desc:"Find your match quickly and effortlessly!", },
  { duration: 3, price: 1200,desc:"Explore connections and discover love together!", },
  { duration: 6, price: 2400,desc:"Build relationships at your own pace!", },
  { duration: 12, price: 5500,desc:"Take your time to find the perfect partner!", },
];

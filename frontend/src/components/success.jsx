import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";

import { axiosInstance } from '../http';
import PropTypes from "prop-types";

export default function Success() {
  const location = useLocation();
  const url = location.search;
  const params = new URLSearchParams(url.split("?")[1]);
  const MerchantTxnId = params.get("MerchantTxnId");
  const GatewayTxnId = params.get("GatewayTxnId");
  console.log(MerchantTxnId);


  const [response, setResponse] = useState({});

  useEffect(() => {

    const getTransactionDetails = async () => {
      try {
        
        const { data } = await axiosInstance.get(
          `payment/checkTransactionStatus/${MerchantTxnId}`
        );
        console.log(data.data);
        setResponse(data.data);
        console.log(response);
      } catch (error) {
        toast.error(error.message);
      }
    };
    getTransactionDetails();

  }, [MerchantTxnId]);

  const [orderInfo,setOrderInfo]=useState()

  // useEffect(() => {

  //   const updateOrders = async () => {
  //     if (MerchantTxnId) {
  //       console.log(MerchantTxnId);
  //       console.log(MerchantTxnId.slice(0, -3));
  //       const orderId=MerchantTxnId.slice(0, -3)
  //       console.log(orderId);

  //       try {
  //         const data = await axiosInstance.put(`/orders/paymentStatus/${orderId}`, { paymentStatus: true });
  //         console.log(data);
  //         setOrderInfo(data?.data);
  //       }
        
  //       catch (error) {
  //         console.log(error.message);
  //       }
  //     }
  //   }
  //   updateOrders();

  // }, [MerchantTxnId]);


   useEffect(() => {

    const updateOrders = async () => {
      if (MerchantTxnId && !orderInfo) {
        console.log(MerchantTxnId);
        console.log(MerchantTxnId.slice(0, -4));
        const userId=MerchantTxnId.slice(0, -4);
        const duration=MerchantTxnId.slice(-4,-3)*30;
        console.log(userId);

        try {
          const data = await axiosInstance.post(`/subscriptions/`, { userId:userId,duration:duration});
          console.log(data);
          setOrderInfo(data?.data);
        
        }
        
        catch (error) {
          console.log(error.message);
        }
      }
    }
    updateOrders();

  }, [MerchantTxnId]);

  return (
    <>
      {response && Object.keys(response).length !== 0 && orderInfo && (
        <div className="w-full  bg-gray-100 p-12 space-y-5 flex justify-center items-center">
          <div class="bg-gray-100 w-full md:w-8/12 lg:w-6/12">
            <Link to="/" className=" underline hover:text-simoBlue mb-4">
              Back to home
            </Link>
            <div class="bg-white p-6  md:mx-auto">
              <svg
                viewBox="0 0 24 24"
                class="text-green-600 w-16 h-16 mx-auto my-6"
              >
                <path
                  fill="currentColor"
                  d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                ></path>
              </svg>
              <div class="text-center">
                <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">
                  Payment Done!
                </h3>
              </div>

              <div class="flex flex-col gap-3 border-b py-6 text-xs">
                <p class="flex justify-between">
                  <span class="text-gray-400">Status:</span>
                  <span>{response.Status} </span>
                </p>
                <p class="flex justify-between">
                  <span class="text-gray-400">Amount:</span>
                  <span>{response.Amount}</span>
                </p>
                <p class="flex justify-between">
                  <span class="text-gray-400">ServiceCharge:</span>
                  <span>{response.ServiceCharge}</span>
                </p>
                <p class="flex justify-between">
                  <span class="text-gray-400">Customer:</span>
                  <span></span>
                </p>

                <p class="flex justify-between">
                  <span class="text-gray-400">Bank Name:</span>
                  <span>{response.Institution} </span>
                </p>
                <p class="flex justify-between">
                  <span class="text-gray-400">Transaction Date:</span>
                  <span>{response.TransactionDate}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
}

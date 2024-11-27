import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { GiToaster } from "react-icons/gi";
import { axiosInstance } from "../http";
import { AuthContext } from "../utils/context/AuthContext";

const Payment = () => {

  const [processId, setProcessId] = useState("");
  const [MerchantTxnId, setMerchantTxnId] = useState("");
  const id = location.pathname.split("/")[1];
  const [orderInfo, setOrderInfo] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getOrderInfo = async () => {
      try {
        const data = await axiosInstance.get(`/orders/${id}`);
        console.log(data?.data);
        data?.data && setOrderInfo(data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getOrderInfo();
  }, [id]);

  const [refresh, setRefresh] = useState(0);

  // useEffect(() => {
  //   const getId = () => {
  //     const mid =
  //       Date.now().toString(36) + Math.random().toString(36).substring(2);
  //     console.log(mid);
  //     setMerchantTxnId(mid);
  //   };
  //   getId();
  // }, []);

  useEffect(() => {

    const getProcessId = async () => {
      if (user && orderInfo && orderInfo?.price) {
        const amount = orderInfo?.price;
        console.log(amount);
        const mid =
          user.id +orderInfo.package+ Math.floor(100 + Math.random() * 900).toString();
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
      }
    };

    getProcessId();

  }, [orderInfo, refresh]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
  
    const form = document.getElementById("form");
    form.target = "_blank";

    form.submit();
  };
  useEffect(() => { }, []);
  return (
    <>
      (
      <div className="mb-4 mt-[70px]">
        <section className="py-24 relative">
          <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
            <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center">
              Order Successful
            </h2>
            <p className="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">
              Thanks for making a purchase you can check our order summary from
              below.
            </p>
            <div className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                <div className="data">
                  <p className="font-semibold text-base leading-7 text-black">
                    Order Id:{" "}
                    <span className="text-indigo-600 font-medium">
                      {id}
                    </span>
                  </p>
                </div>

                <div className="w-full">
                  <form
                    className="w-full"
                    method="post"
                    // action="https://gatewaysandbox.nepalpayment.com/Payment/Index"
                    action="https://gateway.nepalpayment.com/payment/index "
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
                      value={orderInfo.price}
                    />
                    <input
                      id="ProcessId"
                      type="hidden"
                      name="ProcessId"
                      value={processId}
                    />
                    {/* <input
                      id="InstrumentCode"
                      type="hidden"
                      name="InstrumentCode"
                      value="TMBANK"
                    /> */}
                    <input
                      id="TransactionRemarks"
                      type="hidden"
                      name="TransactionRemarks"
                      value="test checkout gateway"
                    />
                    <button
                      disabled={!MerchantTxnId || !processId || !orderInfo}
                      className="rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white bg-indigo-600 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400"
                      type="submit"
                    >
                      Pay
                    </button>
                  </form>
                </div>
              </div>
              <div class="w-full px-3 min-[400px]:px-6">
                <div class="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
                  <div class="flex flex-row items-center w-full ">
                    <div class="grid grid-cols-1 lg:grid-cols-2 w-full">
                      <div class="flex items-center">
                        <div class="">
                          <h2 class="font-semibold text-xl leading-8 text-black mb-3">
                            {orderInfo?.card?.name}
                          </h2>
                          <p class="font-normal text-lg leading-8 text-gray-500 mb-3 ">
                            {orderInfo?.card?.description}
                          </p>
                          <div class="flex flex-row items-center ">
                            <p class="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                              <img
                                src={orderInfo?.card?.thumbnailFront}
                                width="150px"
                                height="150px"
                              ></img>
                            </p>
                            <p class="font-medium text-base leading-7 text-black ">
                              <img
                                src={orderInfo?.card?.thumbnailBack}
                                width="150px"
                                height="150px"
                              ></img>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="grid grid-cols-5">
                        <div class="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                          <div class="flex gap-3 lg:block">
                            <p class="font-medium text-sm leading-7 text-black">
                              price
                            </p>
                            <p class="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                              {orderInfo?.price}
                            </p>
                          </div>
                        </div>
                        <div class="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                          <div class="flex gap-3 lg:block">
                            <p class="font-medium text-sm leading-7 text-black">
                              Status
                            </p>
                            <p class="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                              Ready for payment
                            </p>
                          </div>
                        </div>
                        {/* <div class="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                          <div class="flex gap-3 lg:block">
                            <p class="font-medium text-sm whitespace-nowrap leading-6 text-black">
                              Expected Delivery Time
                            </p>
                            <p class="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                              23rd March 2021
                            </p>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      )
    </>
  );
};

export default Payment;

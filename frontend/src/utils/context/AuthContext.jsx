import { useEffect, useState } from "react";
import { createContext } from "react";
import { axiosInstance } from "../../http";
import axios from "axios";
import { fetchRecommendThunk } from "../../Store/thunk/recommendThunk";
import { useDispatch } from "react-redux";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  
    const [user, setUser] = useState();
    const [paymentStatus, setPaymentStatus] = useState();
    const [useStates, setUseState] = useState();
const dispatch=useDispatch()

//     useEffect(()=>{
// const getUser=async ()=>{
//   try {
//     const {data}=await axiosInstance.get('users/user')
//     console.log(data);
//     if(data){
//       setUser(data);
//     }
//   } catch (error) {
//     console.log(error.message)
//   }
// }
// getUser()
//     },[])

useEffect(() => {
  if(user){
   dispatch(fetchRecommendThunk());
  }
 }, [user]);
    useEffect(() => {
      const getPaymentStatus = async () => {
        if (user) {
          const data = await axiosInstance.get(`subscriptions/user/${user.id}`);
          if (data && data?.data?.status) {
            console.log(data)
            setPaymentStatus(data.data.status)
            console.log(data.data.status)
            setUseState(data.data.status)
          }
          else {
            setPaymentStatus("unpaid")
          }
        }
      }
      getPaymentStatus()
    }, [user]);
  
    console.log(paymentStatus)
    // useEffect(() => {
    //   console.log(paymentstatus)
    // }, [paymentstatus])
  

    return <AuthContext.Provider value={{ user,setUser,paymentStatus,setPaymentStatus,useStates}}>{children}</AuthContext.Provider>;

};

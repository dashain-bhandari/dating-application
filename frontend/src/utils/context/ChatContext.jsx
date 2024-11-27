import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { axiosInstance } from "../../http";


export const chatContext=createContext()

export const ChatContextProvider=({children})=>{

const [connected,setConnected]=useState(true)
const [connections,setConnections]=useState([])
const {user}=useContext(AuthContext);
console.log(user)
useEffect(()=>{
        const getConnection = async () => {
     
        try {
         
          const { data } = await axiosInstance.get(`connection`)
          console.log(data)
          if (data) {
          console.log(data);
         let newA= []
         newA=data.length>0 ?data.map((item)=>(
            user?.id==item?.sender?.id?item?.receiver?.id:item?.sender?.id
          )):[]
          console.log(newA)
          setConnections(newA)
          }
         
        
        } catch (error) {
         
          console.log(error.message);
          // setConnected(false);
        }
      
    }
    getConnection()
},[user])
return (<chatContext.Provider value={{connected,setConnected,connections,setConnections}}>
    {children}
</chatContext.Provider>)
}
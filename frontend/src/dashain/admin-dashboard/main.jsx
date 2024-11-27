import { Outlet } from "react-router-dom"
import Layout from "../../components/Layout"
import Sidebar from "./sidebar"


const Main = () => {
    return (<>
        <div className="flex flex-row bg-gray-100">
            <Sidebar />
          <div className="h-screen overflow-y-auto w-full">
          <Outlet />   </div>  
         
        </div>
    </>)
}

export default Main
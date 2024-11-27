import { useEffect, useState } from "react";
import logo from "../../images/newLogo.png";
import TableX from "./format";
import { axiosInstance } from "../../http";

const Overview = () => {
    const [stats, setStats] = useState()
    const getTotalNum = async () => {
        try {
            const { data } = await axiosInstance.get('/stats');
            console.log(data);
            setStats(data);
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        getTotalNum()
    }, [])
    return (<>
        <div className="w-full h-fit grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 px-4">
            <div className="bg-white px-4 py-4 rounded flex flex-row  items-center gap-4 shadow-md">

                <div><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
                    <path fill="#D22D3D" d="M16 17v2H2v-2s0-4 7-4s7 4 7 4m-3.5-9.5A3.5 3.5 0 1 0 9 11a3.5 3.5 0 0 0 3.5-3.5m3.44 5.5A5.32 5.32 0 0 1 18 17v2h4v-2s0-3.63-6.06-4M15 4a3.4 3.4 0 0 0-1.93.59a5 5 0 0 1 0 5.82A3.4 3.4 0 0 0 15 11a3.5 3.5 0 0 0 0-7" />
                </svg></div>
                <div className="flex flex-col ">
                    <div className="text-xl font-bold">{stats?.user || 0}</div>
                    <div>Users</div>
                </div>
            </div>
            <div className="bg-white  px-4 py-4 rounded flex  flex-row   items-center gap-4 shadow-md">
                <div><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
                    <path fill="#D22D3D" d="M15 14c-2.67 0-8 1.33-8 4v2h16v-2c0-2.67-5.33-4-8-4m-9-4V7H4v3H1v2h3v3h2v-3h3v-2m6 2a4 4 0 0 0 4-4a4 4 0 0 0-4-4a4 4 0 0 0-4 4a4 4 0 0 0 4 4" />
                </svg></div>
                <div className="flex flex-col ">
                    <div className="text-xl font-bold">{stats?.connection || 0}</div>
                    <div>Connections</div>
                </div>
            </div>
            <div className="bg-white  px-4 py-4 rounded flex  flex-row  items-center gap-4 shadow-md"><div><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
                <path fill="#D22D3D" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z" />
            </svg></div>
                <div className="flex flex-col ">
                    <div className="text-xl font-bold">{stats?.email || 0}</div>
                    <div>History</div>
                </div></div>

        </div>
        <div>

        </div>

        <div className="px-4 w-full mt-4">
            <div className="text-xl text-[#D22D3D] font-bold">
                Google Analytics
            </div>
            <TableX />
        </div>

    </>)
}

export default Overview;
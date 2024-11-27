import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../http";
import { ClipLoader } from "react-spinners";


const ConnectionsView = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const id = location.pathname.split('/')[5];
    console.log(id)
    const [user, setUser] = useState({})
    const [connection, setConnection] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getConnection = async () => {
            try {
                setLoading(true)
                const { data } = await axiosInstance.get(`connection/connection/${id}`);
                console.log(data);
                setConnection(data);
                setLoading(false);
            } catch (error) {
                console.log(error.message);
                setLoading(false);
            }
        }
        getConnection()
    }, [id])

    return (<>
        <div className="w-full px-4 mb-12">
            <div className="mt-12 underline hover:text-[#D22D3D] cursor-pointer" onClick={() => navigate(-1)}>
                back
            </div>
            <div className="mt-4 flex justify-center text-2xl font-bold text-[#D22D3D]">
                View Connection
            </div>


            {
                loading ? (<>
                    <div className="w-full h-full flex justify-center items-center">
                        <ClipLoader
                            color={"#D22D3D"}
                            loading={loading}
                            cssOverride={{}}
                            size={50}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                </>) : (<>
                    <div className="mt-4">
                        Sender
                    </div>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {connection.sender?.profile?.fullname && <div className="flex flex-col justify-center">
                            <div className="text-gray-700">Name</div>
                            <div className="border border-gray-200 bg-white text-gray-700 p-2" >{connection?.sender?.profile?.fullname}</div>
                        </div>}
                        {
                            connection.sender?.profile?.fullname && <div className="flex flex-col justify-center">
                                <div className="text-gray-700">Email</div>
                                <div className="border border-gray-200 bg-white text-gray-700 p-2" >{connection?.sender?.email}</div>
                            </div>
                        }
                        {
                            connection.sender?.profile?.fullname && (<div className="flex flex-col justify-center">
                                <div className="text-gray-700">Username</div>
                                <div className="border border-gray-200 bg-white text-gray-700 p-2" >{connection?.sender?.username}</div>
                            </div>)
                        }

                        {
                            connection.sender?.profile?.fullname && (<div className="flex flex-col justify-center">
                                <div className="text-gray-700">Gender</div>
                                <div className="border border-gray-200 bg-white text-gray-700 p-2" >{connection?.sender?.profile?.sex}</div>
                            </div>)
                        }

                        {
                            connection.sender?.profile?.fullname && (
                                <div className="flex flex-col justify-center">
                                    <div className="text-gray-700">Religion</div>
                                    <div className="border border-gray-200 bg-white text-gray-700 p-2" >{connection?.sender?.profile?.religion}</div>
                                </div>
                            )
                        }
                        {
                            connection.sender?.profile?.fullname && (<div className="flex flex-col justify-center">
                                <div className="text-gray-700">Caste</div>
                                <div className="border border-gray-200 bg-white text-gray-700 p-2" >{connection?.sender?.profile?.caste}</div>
                            </div>)
                        }

                        {
                            connection.sender?.profile?.fullname && (<div className="flex flex-col justify-center">
                                <div className="text-gray-700">Address</div>
                                <div className="border border-gray-200 bg-white text-gray-700 p-2" >{connection?.sender?.profile?.address}</div>
                            </div>)
                        }
                    </div>

                    {/* 
receiver */}

                    <div className="mt-4">
                        Receiver
                    </div>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {connection.receiver?.profile?.fullname && <div className="flex flex-col justify-center">
                            <div className="text-gray-700">Name</div>
                            <div className="border border-gray-200 bg-white text-gray-700 p-2" >{connection?.receiver?.profile?.fullname}</div>
                        </div>}
                        {
                            connection.receiver?.profile?.fullname && <div className="flex flex-col justify-center">
                                <div className="text-gray-700">Email</div>
                                <div className="border border-gray-200 bg-white text-gray-700 p-2" >{connection?.receiver?.email}</div>
                            </div>
                        }
                        {
                            connection.receiver?.profile?.fullname && (<div className="flex flex-col justify-center">
                                <div className="text-gray-700">Username</div>
                                <div className="border border-gray-200 bg-white text-gray-700 p-2" >{connection?.receiver?.username}</div>
                            </div>)
                        }

                        {
                            connection.receiver?.profile?.fullname && (<div className="flex flex-col justify-center">
                                <div className="text-gray-700">Gender</div>
                                <div className="border border-gray-200 bg-white text-gray-700 p-2" >{connection?.receiver?.profile?.sex}</div>
                            </div>)
                        }

                        {
                            connection.receiver?.profile?.fullname && (
                                <div className="flex flex-col justify-center">
                                    <div className="text-gray-700">Religion</div>
                                    <div className="border border-gray-200 bg-white text-gray-700 p-2" >{connection?.receiver?.profile?.religion}</div>
                                </div>
                            )
                        }
                        {
                            connection.receiver?.profile?.fullname && (<div className="flex flex-col justify-center">
                                <div className="text-gray-700">Caste</div>
                                <div className="border border-gray-200 bg-white text-gray-700 p-2" >{connection?.receiver?.profile?.caste}</div>
                            </div>)
                        }

                        {
                            connection.receiver?.profile?.fullname && (<div className="flex flex-col justify-center">
                                <div className="text-gray-700">Address</div>
                                <div className="border border-gray-200 bg-white text-gray-700 p-2" >{connection?.receiver?.profile?.address}</div>
                            </div>)
                        }
                    </div>

                </>)
            }
        </div>
    </>)
}
export default ConnectionsView;
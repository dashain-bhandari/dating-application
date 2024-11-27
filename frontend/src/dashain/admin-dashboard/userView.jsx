import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../http";
import { Loader } from "lucide-react";
import { ClipLoader } from "react-spinners";


const UserView = () => {
    console.log("hoooo")
    const navigate = useNavigate()
    const location = useLocation();
    const id = location.pathname.split('/')[5];
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getUser = async () => {
            try {
                setLoading(true)
                const { data } = await axiosInstance.get(`users/user/${id}`);
                console.log(data);
                setUser(data);
                setLoading(false);
            } catch (error) {
                console.log(error.message);
                setLoading(false);
            }
        }
        getUser()
    }, [id])

    return (<>
        <div className="w-full px-4 mb-12">
            <div className="mt-12 underline hover:text-[#D22D3D] cursor-pointer" onClick={() => navigate(-1)}>
                back
            </div>
            <div className="mt-4 flex justify-center text-2xl font-bold text-[#D22D3D]">
                View User
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
                        General Information
                    </div>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col justify-center">
                            <div className="text-gray-700">Name</div>
                            <div className="border border-gray-200 bg-white text-gray-700 p-2" >{user?.profile?.fullname}</div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="text-gray-700">Email</div>
                            <div className="border border-gray-200 bg-white text-gray-700 p-2" >{user?.email}</div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="text-gray-700">Username</div>
                            <div className="border border-gray-200 bg-white text-gray-700 p-2" >{user?.username}</div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="text-gray-700">Gender</div>
                            <div className="border border-gray-200 bg-white text-gray-700 p-2" >{user?.profile?.sex}</div>
                        </div>

                        <div className="flex flex-col justify-center">
                            <div className="text-gray-700">Religion</div>
                            <div className="border border-gray-200 bg-white text-gray-700 p-2" >{user?.profile?.religion}</div>
                        </div>

                        <div className="flex flex-col justify-center">
                            <div className="text-gray-700">Caste</div>
                            <div className="border border-gray-200 bg-white text-gray-700 p-2" >{user?.profile?.caste}</div>
                        </div>

                        <div className="flex flex-col justify-center">
                            <div className="text-gray-700">Address</div>
                            <div className="border border-gray-200 bg-white text-gray-700 p-2" >{user?.profile?.address}</div>
                        </div>
                    </div>
                    {
                        user.subscription && (<>
                            <div className="mt-4">
                                Payment Information
                            </div>
                            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col justify-center">
                                    <div className="text-gray-700">Payment status</div>
                                    <div className="border border-gray-200 bg-white text-gray-700 p-2" >{user?.subscription?.status}</div>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <div className="text-gray-700">Package</div>
                                    <div className="border border-gray-200 bg-white text-gray-700 p-2" >{user?.subscription?.duration / 30 == 1 ? user?.subscription?.duration / 30 + " " + "month" : user?.subscription?.duration / 30 + " " + "months"}</div>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <div className="text-gray-700">Subscription Date</div>
                                    <div className="border border-gray-200 bg-white text-gray-700 p-2" >{user?.subscription?.startDate.slice(0, 10)}</div>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <div className="text-gray-700">Expiry Date</div>
                                    <div className="border border-gray-200 bg-white text-gray-700 p-2" >{user?.subscription?.expiryDate.slice(0, 10)}</div>
                                </div>

                                <div className="flex flex-col justify-center">
                                    <div className="text-gray-700">Reminder sent</div>
                                    <div className="border border-gray-200 bg-white text-gray-700 p-2" >{user?.subscription?.reminderSent ? "True" : "False"}</div>
                                </div>
                            </div>
                        </>)
                    }
                </>)
            }
        </div>
    </>)
}
export default UserView;
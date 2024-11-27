import { Link, useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../http";
import { socket } from "../../utils/context/SocketContext";
import { useDispatch } from "react-redux";
import { addToast } from "../../Store/features/toastSlice";
import { logOutUser } from "../../Store/features/authSlice";
import { Icon } from "@iconify/react/dist/iconify.js";

const Nav = () => {
    const location = useLocation();
    const pathname = location.pathname
    console.log(pathname)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {

        axiosInstance
            .post(`/authentication/log-out`, {})
            .then((response) => {
                if (response.status === 200) {
                    dispatch(
                        addToast({ msg: "Logged Out successfully", kind: "SUCCESS" })
                    );
                    dispatch(logOutUser());
                    socket.disconnect()
                    navigate("/admin-dashboard", { replace: true });
                }
            })
            .catch((error) => {
                if (error.response) {
                    const response = error.response;
                    const { message } = response.data;
                    console.log(message);
                    switch (response.status) {
                        case 401:
                            dispatch(
                                addToast({ msg: "Logged Out successfully", kind: "SUCCESS" })
                            );
                            dispatch(logOutUser());
                            navigate("/auth", { replace: true });
                            break;
                        case 400:
                        case 500:
                            console.log(message);
                            dispatch(addToast({ kind: "ERROR", msg: message }));
                            break;
                        default:
                            dispatch(
                                addToast({
                                    kind: "ERROR",
                                    msg: "Oops, Something went wrong",
                                })
                            );
                            break;
                    }
                }
            });
    };

    return (<>
        <div className="flex flex-col gap-2">
            <Link to='overview' className={`rounded flex flex-row gap-2 items-center ${pathname.includes('overview') ? "bg-[#D22D3D] text-white" : ""} p-2 hover:text-[#D22D3D]`}><Icon icon="mdi:home-heart" width="30" height="30"  style={{color: pathname.includes('overview')  ?"#FFF":"D22D3D"}} /><div>Overview</div></Link>
            <Link to='users' className={`rounded flex flex-row gap-2 items-center ${pathname.includes('user') ? "bg-[#D22D3D] text-white" : "" }  p-2 hover:text-[#D22D3D]`}><Icon icon="mdi:user" width="30" height="30"  style={{color: pathname.includes('user')  ?"#FFF":"D22D3D"}} /><div>User</div></Link>
            <Link to='connections' className={`flex flex-row gap-2 items-center rounded ${pathname.includes('connection') ? "bg-[#D22D3D] text-white" : ""}  p-2 hover:text-[#D22D3D]`}><Icon icon="mdi:user-plus" width="30" height="30"  style={{color: pathname.includes('connection') ?"#FFF":"D22D3D"}} /><div>Connection</div></Link>
            <Link to='history' className={`flex flex-row gap-2 items-center rounded ${pathname.includes('history') ? "bg-[#D22D3D] text-white" : ""}  p-2 hover:text-[#D22D3D]`}><Icon icon="material-symbols:mail" width="30" height="30"  style={{color: pathname.includes('history') ?"#FFF":"D22D3D"}} /><div>History</div></Link>
            <Link to='notifications' className={`flex flex-row gap-2 items-center rounded ${pathname.includes('notifications') ? "bg-[#D22D3D] text-white" : ""}  p-2 hover:text-[#D22D3D]`}><Icon icon="mdi:bell" width="30" height="30"  style={{color: pathname.includes('notifications') ?"#FFF":"D22D3D"}} /><div>Notifcation</div></Link>
            <button className=" rounded text-[#D22D3D]  px-2 w-fit py-2 hover:text-black flex flex-row gap-2 items-center" onClick={handleLogout}>
            <Icon icon="material-symbols:logout" width="30" height="30"  style={{color: "#D22D3D"}} />
                <div>
                Log out
                </div></button>
        </div>
    </>)
}

export default Nav;
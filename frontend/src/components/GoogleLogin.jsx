import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../utils/context/AuthContext";
import { axiosInstance } from "../http";
import { showNotification } from "@mantine/notifications";


export default function GoogleSingnIn() {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from == "buy" ? "/" : "/home/main/dashboard";
    const pathname = location.pathname.split("/")[1];
    const { user, setUser } = useContext(AuthContext);
    function generateRandomString(length) {
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    return (
        <div className="">
            <GoogleLogin
                onSuccess={async (credentialResponse) => {
                    var decoded = jwtDecode(credentialResponse.credential);
                    console.log(decoded);

                    try {
                        const randomText = generateRandomString(10);
                        const usernameWithRandomText = decoded.given_name + randomText;
                        const usernameLowerCase = usernameWithRandomText.toLowerCase();

                        const res = await axiosInstance.post("/authentication/google/login", {
                            email: decoded.email,
                             username: usernameLowerCase,
                            isGoogleAuth: true,
                            emailVerified: true,
                        });
                        // localStorage.setItem("accessToken", res.data.accessToken);
                        // setUser(res.data)
                        const user=res.data;
                        console.log(res.data)
                        console.log(user.profile);
                        console.log(user.family);
                        console.log(user.education);
                        console.log(user.preferance);
                        setUser(res.data)
                        if (user && !user.profile  && user.role!="super-admin") {
                          navigate("/form");
                        } else if (user && !user.family  && user.role!="super-admin") {
                          navigate("/form");
                        } else if (user && !user.education  && user.role!="super-admin") {
                          navigate("/form");
                        } else if (user && !user.preferance  && user.role!="super-admin") {
                          navigate("/form");
                        } else {
                            
                            console.log("hiiii")
                          
                        
                          navigate(from, { replace: true });
                        }


                    } catch (error) {
                        console.log(error.response.status);
                        error?.response?.data?.message?showNotification({title:error?.response?.data?.message}):showNotification({title:"Something went wrong"})
                        console.log(error);
                    }
                }}
                onError={() => {
                    console.log("Login Failed");
                    toast.error("Login Failed");
                }}
            />
        </div>
    );
}

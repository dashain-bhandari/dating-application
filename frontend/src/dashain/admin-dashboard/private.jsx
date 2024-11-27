import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ClipLoader } from "react-spinners";
import { useState } from "react";

export const Private = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { loading, user } = useAuth();
    const [color, setColor] = useState("var(--primary)");
    console.log(user)


    
    if (user && user.role=="super-admin") {
        console.log("returning children");
        return children;
    }

    if ((!user || user.role!="super-admin") && !loading) {
        return <Navigate to="/admin-dashboard" state={{ from: location }} replace />;
    }
};

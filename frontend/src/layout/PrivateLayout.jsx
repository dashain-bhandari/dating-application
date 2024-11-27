import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ClipLoader } from "react-spinners";
import { useState } from "react";

export const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loading, user } = useAuth();
  const [color, setColor] = useState("var(--primary)");
console.log(user)
  // if (loading) {
  //   return (
  //   <div className="w-screen h-screen flex justify-center items-center">
  //     <ClipLoader
  //       color={color}
  //       loading={loading}
  //       cssOverride={{}}
  //       size={150}
  //       aria-label="Loading Spinner"
  //       data-testid="loader"
  //     />
  //     </div>
  //   )
  // }

  if (user && !user.profile && user.role!="super-admin") {
    console.log("prof");
    return navigate("/form");
  } else if (user && !user.family && user.role!="super-admin") {
    console.log("fimaki");
    return navigate("/form");
  } else if (user && !user.education && user.role!="super-admin") {
    console.log("education");
    return navigate("/form");
  } else if (user && !user.preferance && user.role!="super-admin") {
    console.log("pref");
    return navigate("/form");
  }

  if (user) {
    console.log("returning children");
    return children;
  }

  if (!user && !loading) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
};

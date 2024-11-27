import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation, useNavigate} from "react-router-dom"
import { useAuth } from "../hooks/useAuth";
import { ClipLoader, PropagateLoader, PuffLoader } from "react-spinners";
import { useState } from "react";

export const PrivateFormRoute = ({children}) => {
   
   const location = useLocation();
   const navigate = useNavigate();
   const { loading, user } = useAuth();
   const [color, setColor] = useState('var(--primary)')


  if (loading) {
    return (
    <div className="w-screen h-screen flex justify-center items-center">
      <PuffLoader
        color={color}
        loading={loading}
        cssOverride={{}}
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
    )
  }
   
  if(!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  console.log(user);

  if(user) {
   
     return children ? children : <Outlet/>;
  }


}
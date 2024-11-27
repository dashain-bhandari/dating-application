import { useSelector } from "react-redux"
import { Navigate, useLocation, useNavigate} from "react-router-dom"
import { useAuth } from "../hooks/useAuth";
import { ClipLoader } from "react-spinners";
import { useState } from "react";

export const EmailVerifyLayout = ({children}) => {
   
   const location = useLocation();
   const navigate = useNavigate();
   const { loading, user } = useAuth();
   const [color, setColor] = useState('var(--primary)')


  if (loading) {
    return (
    <div className="w-screen h-screen flex justify-center items-center">
      <ClipLoader
        color={color}
        loading={loading}
        cssOverride={{}}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
    )
  }
   

  
 if(!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else if(user && !user.emailVerified) {
     return children;
  }else if(user && !user.profile) {
    navigate('/profile/info')
  }else if(user && !user.family) {
    navigate('profile/info')
  }else if(user && !user.education) {
    navigate('/profile/info');
  }else if(user && !user.preferance) {
    navigate('/profile/info')
  }else {
    navigate('/home/dashboard');
  }
  
}
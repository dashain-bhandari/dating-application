import { Link } from "react-router-dom";
import logo from "../../images/newLogo.png";
import Nav from "./nav";

const Sidebar = () => {
    
    return (<>
        <div className="bg-white w-2/3 md:w-1/4 h-screen flex flex-col gap-4 p-4">
            <div className="flex flex-row ">
               <Link to="/">
               <img src={logo} alt="OurLifePartner" width={200} height={200}></img>
               </Link>
                
                
            </div>
            <Nav />
        </div>
    </>)
}

export default Sidebar;
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import what from "../images/what.png";
import dashboard from "../images/Dashboard.png";
import Home from "../images/Home.png";

const tablinks = [
  {
    img: what,
    title: "About Us",
    path: "/about",
  },
  {
    img: Home,
    title: "Home",
    path: "/",
  },
  {
    img: dashboard,
    title: "Dashboard",
    path: "/home/main/dashboard",
  },
];

const Mobiletab = () => {
  const location = useLocation();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const activeIndex = tablinks.findIndex(tab => tab.path === location.pathname);
    setActive(activeIndex !== -1 ? activeIndex : 0);
  }, [location.pathname]);

  return (
    <main className='text-center text-white z-[100]'>
      <div className='py-1 px-2 flex justify-between bg-gradient-to-b from-[#EB4566] to-[#9F1632]'>
        {tablinks.map((data, index) => (
          <div 
            key={index} 
            className={`w-20 ${active === index ? 'bg-gradient-to-b from-[#c63f5a] to-[#9F1632] rounded-xl ' : ''}`}
          >
            <Link to={data.path} className='flex flex-col items-center'>
              <img src={data.img} alt="icons" />
              <h2 className='text-[10px]'>{data.title}</h2>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Mobiletab;

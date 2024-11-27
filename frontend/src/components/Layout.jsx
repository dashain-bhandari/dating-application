import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Mobiletab from "./Mobiletab";

const Layout = ({ children }) => {
  return (
    <div>
    <Header />
      <div>{children}</div>
      <div className="sm:hidden w-full fixed bottom-0">
      <Mobiletab/>
      </div>
    <Footer />
    </div>
  );
};

export default Layout;

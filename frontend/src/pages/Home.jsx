import React, { useContext } from "react";
import Herosection from "../components/Herosection";
import Third from "../components/Third";
import First from "../components/First";
import Second from "../components/Second";
import Fourth from "../components/Fourth";
import Fifth from "../components/Fifth";
import Seventh from "../components/Seventh";
import Eight from "../components/Eight";
import Nine from "../components/Nine";
import Sixth from "../components/Sixth";
import Layout from "../components/Layout";
import NewTestimonial from "../components/NewTestimonial";
import RecentCouples from "../components/RecentCouples";
import ExploreProfile from "../components/ExploreProfile";
import TrustComponent from "../components/TrustComponent";
import { AuthContext } from "../utils/context/AuthContext";

const Home = () => {
  const {user}=useContext(AuthContext);
  console.log(user);
  return (
    <Layout>
      <Herosection />
      <TrustComponent />
      <NewTestimonial />
      <ExploreProfile />
      <RecentCouples />
      <Sixth />
      <Fifth />
    </Layout>
  );
};

export default Home;

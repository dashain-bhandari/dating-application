import React from "react";
import "reactjs-popup/dist/index.css";
import DashboardMain from "./DashboardMain";

export default function DashboardPage() {
  console.log("hii")
  return (
    <div className="bg-light pt-10 w-full">
      <DashboardMain />
    </div>
  );
}

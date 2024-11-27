import React from "react";
// import noDataFound from "../../images/noDataImage.png";
import noDataFound from "../../images/emptyFolder.png";
import noData from "../../images/nodata.jpg"

function NoDataFound() {
  return (
    <div className="w-full flex flex-col justify-center items-center relative h-[80vh] bg-white">
      <div className=" w-40 h-40">
        <img
          className="object-cover w-full h-full object-center "
          src={noData}
          alt="nodata"
        />
      </div>
      {/* <h1 className=" absolute font-semibold text-sm text-gray-600">No Data</h1> */}
    </div>
  );
}

export default NoDataFound;

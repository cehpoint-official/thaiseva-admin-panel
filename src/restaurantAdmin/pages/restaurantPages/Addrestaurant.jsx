import React from "react";
import RestaImg from "../../../assets/Restaurant.png";
import { Link, useParams } from "react-router-dom";

const Addrestaurant = () => {
  const currentUserParam = useParams();
  const currentUser = currentUserParam["id"];
  return (
    <>
      <div className="bg-slate-100 px-8 pt-0 h-auto">
        {/* <p className="lg:text-3xl md:text-2xl font-bold text-blue-600">My Restaurant</p> */}
        <div className="bg-white py-28 rounded-lg shadow-blue-900 flex justify-center">
          <div className="text-center">
            <div className=" flex justify-center">
              <img src={RestaImg} alt="" />
            </div>
            <p className="text-slate-500 mb-6 text-lg">
              No restaurants have been added yet!
            </p>
            <Link
              to={`/${currentUser}/restaurant/addrestaurant/restaInformation`}
              className="px-4 py-2 rounded-lg
                         bg-blue-700 text-white text-lg"
            >
              Add your Restaurant
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addrestaurant;

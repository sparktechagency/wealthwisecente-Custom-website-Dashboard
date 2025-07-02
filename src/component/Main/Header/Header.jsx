/* eslint-disable react/prop-types */

import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { RiNotificationFill } from "react-icons/ri";
import userImage from "/public/Auth/user.png";
import { MdNotificationsNone } from "react-icons/md";
import { useGetUserProfileQuery } from "../../../redux/features/setting/settingApi";
import { useEffect, useState } from "react";
import Url from "../../../redux/baseApi/forImageUrl";
import { IoNotifications } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const { data: userProfile, refetch } = useGetUserProfileQuery();

  const user = userProfile?.data;
  // console.log(user); 

  useEffect(() => {
    refetch();
  }, [refetch]);

  const [show, setShow] = useState(false);

  // Toggles the profile options visibility
  const handleShow = () => {
    setShow(!show); // Toggle the show state
  };

  return (
    <div className="w-full px-5 py-3.5 bg-[#000000] flex justify-between items-center text-white sticky top-0 left-0 z-10">
      <div className="flex items-center gap-3">
        {/* Hamburger menu for mobile */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={toggleSidebar}
        >
          <FiMenu />
        </button>
      </div>

      <div className="flex justify-between items-center gap-5">
        <Link to={"/notification"}>
          <h1 className="relative text-[#000000] p-2 rounded-full bg-white">
            <MdNotificationsNone className="size-8" />
            {/* <span className="absolute top-0 right-0 w-5 h-5 text-white text-xs flex justify-center items-center bg-red-500 rounded-full">99+</span> */}
          </h1>

        </Link>
        <div className='flex items-center gap-3'>
          <div onClick={handleShow} className='flex items-center gap-3 border-2 py-2 px-8 border-white rounded-lg cursor-pointer transition-all duration-300 ease-in-out'>
            <img className='w-8 h-8 rounded-full' src="/logo/userimage.png" alt="User" />
            <span>John Doe</span>
            {
              !show ? (
                <FaChevronDown className='text-2xl' />
              ) : (
                <FaChevronDown className='text-2xl rotate-180' />
              )
            }
          </div>

          {/* Conditionally show the profile options */}
          {show && (
            <div className='profile-options absolute z-[100] top-20 bg-black right-5  flex flex-col gap-3 border-2 p-2  border-white rounded-lg cursor-pointer transition-all duration-300 ease-in-out'>
              <Link to="/settings/personal-info" className='border-2 py-2 px-14 border-white rounded-lg cursor-pointer'>Profile</Link>
              <button className='border-2 py-2 px-14 border-white rounded-lg cursor-pointer'>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
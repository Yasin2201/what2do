import { useState } from "react";
import { FaCreditCard, FaEquals } from "react-icons/fa"
import { SideNavigation } from "./SideNavigation";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="fixed py-5 pl-5 justify-center md:hidden h-20 w-20 z-40">
        <button onClick={() => {setIsOpen(!isOpen)}}>
          <FaEquals size={45} color={`${isOpen ? "white" : ""}`}/>
        </button>
      </div>
      <div className={`fixed top-0 left-0 ease-in-out duration-300 h-full bg-gray-800 w-[100vw] sm:w-[70vw] md:relative md:w-80 md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-evenly text-xl font-bold bg-gray-900 text-white w-full h-20 px-5">
          <FaCreditCard size={45} color="white" />
          <span>what2Do</span>
        </div>
        <div className="text-white font-medium m-4 flex flex-col">
          <SideNavigation />
        </div>
      </div>
    </>
  );
};

export default Sidebar;

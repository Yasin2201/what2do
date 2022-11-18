import { FaCreditCard } from "react-icons/fa"

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-full w-72">
      <div className="flex items-center justify-evenly text-xl font-bold bg-gray-900 text-white w-full h-20 px-5">
        <FaCreditCard size={45} color="white" />
        <span>what2Do</span>
      </div>
    </div>
  );
};

export default Sidebar;
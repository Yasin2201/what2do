import { useAuthContext } from "@/hooks/useAuthContext"
import { useState } from "react"
import { FaUserCircle } from "react-icons/fa"
import { useLogout } from "@/hooks/useLogout"

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {user} = useAuthContext()
  const {logout} = useLogout()
  
  return (
    <div className="flex items-center justify-end bg-white text-gray-800 w-full h-20 px-10 shadow-sm shadow-gray-200 ">
      <p className=" font-bold px-3">
        {user.username}
      </p>
      <div className="px-3">
        <div>
            <button onClick={() => {setIsOpen(!isOpen)}} >
              <FaUserCircle size={50} />
            </button>
        </div>
        <div id="dropdown" className={`fixed w-44 right-10 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-800 ${isOpen ? "" : "hidden"}`}>
          <ul className="py-1 text-sm text-gray-800 dark:text-gray-200" aria-labelledby="dropdownDefault">
            <li>
              <a href="/profile" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</a>
            </li>
            <li>
              <a href="/dashboard" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
            </li>
            <li>
              <a href="/login" onClick={logout} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
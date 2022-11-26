import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import Sidebar from "./Sidebar/Sidebar"

export const MainLayout = () => {
  return (
    <div className="flex w-100 h-full">
      <Sidebar />
      <div id="home" className="w-full">
      <Header />
      <Outlet />
      </div>
    </div>
  )
}

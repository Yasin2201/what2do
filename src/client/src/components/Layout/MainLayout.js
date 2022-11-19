import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import Sidebar from "./Sidebar"

export const MainLayout = () => {
  return (
    <div className="flex w-100 h-full">
      <Sidebar />
      <div id="home" className="flex flex-col w-full">
      <Header />
      <Outlet />
      </div>
    </div>
  )
}

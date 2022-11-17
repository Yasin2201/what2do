import { Outlet } from "react-router-dom"
import { Header } from "./Header"

export const MainLayout = () => {
  return (
    <div className="h-screen overflow-hidden bg-gray-100">
      <Header />
      <Outlet />
    </div>
  )
}

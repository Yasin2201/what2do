import { Login } from "@/features/auth/routes/Login";
import { Register } from "@/features/auth/routes/Register";

function PublicRoutes() {
  return (
    <div>
      <Login />
      <Register />
    </div>
  )
}

export default PublicRoutes
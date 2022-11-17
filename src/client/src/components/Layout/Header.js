import { useAuthContext } from "@/hooks/useAuthContext"
import { useLogout } from "@/hooks/useLogout"

export const Header = () => {
  const {user} = useAuthContext()
  const {logout} = useLogout()
  
  return (
    <div className="mx-auto px-2 sm:px-6 lg:px-10 bg-gray-800">
      <div className="relative flex h-16 items-center justify-between">
        <div className="flex flex-1 items-center justify-end sm:items-stretch sm:justify-end">
          <div className="flex items-center">
            <div className="px-4">
              <p className="text-white font-bold">{user.username}</p>
            </div>
            <div className="px-4">
              <button onClick={logout} className="text-white font-bold py-1 px-2 rounded border-2 border-gray-100 hover:bg-gray-100 hover:text-gray-800">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
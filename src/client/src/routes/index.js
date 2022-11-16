import { useAuth } from '@/lib/auth';
import ProtectedRoutes from './protected';
import PublicRoutes from './public';

export const AppRoutes = () => {
  const auth = useAuth()
  console.log(auth)

  if (auth.isLoading) {
    return (
      <div>
        Loading....
      </div>
    )
  }
  
  return (
    auth.user ? <ProtectedRoutes /> : <PublicRoutes />
  )
};
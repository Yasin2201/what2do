import ProtectedRoutes from './protected';
import { useAuthContext } from '@/hooks/useAuthContext';
import PublicRoutes from './public';

export const AppRoutes = () => {
  const { user, isLoading } = useAuthContext()

  if (isLoading) {
    return (
      <div>
        Loading....
      </div>
    )
  }

  return (
    user ? <ProtectedRoutes /> : <PublicRoutes />
  )
};
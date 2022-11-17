import AllRoutes from './allRoutes';
import { useAuthContext } from '@/hooks/useAuthContext';

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
    <AllRoutes user={user}/>
  )
};
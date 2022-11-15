import { useRoutes } from 'react-router-dom';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { useAuth } from '@/lib/auth';

export const AppRoutes = () => {
  const auth = useAuth()

  // const commonRoutes = [{ path: '/', element: <div>Landing</div> }];
  
  const routes = auth.user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes]);

  return <>{element}</>;
};
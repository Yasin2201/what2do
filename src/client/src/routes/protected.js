import { Navigate, Outlet } from 'react-router-dom';
import { Profile } from '@/features/users';
import { Dashboard } from '@/features/misc';

const App = () => {
  return (
    <div>
      <h1>Protected Routes View</h1>
      <Outlet />
    </div>
  );
};

export const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/profile', element: <Profile /> },
      { path: '/dash', element: <Dashboard /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];

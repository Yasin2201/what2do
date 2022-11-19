import { Navigate, Route, Routes } from 'react-router-dom';
import { Profile } from '../features/users/routes/Profile';
import { Dashboard } from '../features/misc/routes/Dashboard';
import { Login } from '@/features/auth/routes/Login';
import { Register } from '@/features/auth/routes/Register';
import { MainLayout } from '@/components/Layout/MainLayout';
import { Activitys } from '@/features/activitys/routes/Activitys';
import { Groups } from '@/features/groups/routes/Groups';

function AllRoutes({user}) {
  return (
    <Routes>
      <Route path="/" element={
        <>
          {!user && <Navigate to="/login" />}
          {user && <MainLayout />}
        </>
      } >
        <Route path="profile" element={
            <>
              {!user && <Navigate to="/login" />}
              {user && <Profile />}
            </>
          } />
        
        <Route path="dashboard" element={
            <>
              {!user && <Navigate to="/login" />}
              {user && <Dashboard />}
            </>
          } />

        <Route path="activities" element={
            <>
              {!user && <Navigate to="/login" />}
              {user && <Activitys />}
            </>
          } />

        <Route path="groups" element={
            <>
              {!user && <Navigate to="/login" />}
              {user && <Groups />}
            </>
          } />
      </Route>

      <Route path="/login" element={
          <>
            {user && <Navigate to="/dashboard" />}
            {!user && <Login />}
          </>
        } />

      <Route path="/register" element={
          <>
            {user && <Navigate to="/dashboard" />}
            {!user && <Register />}
          </>
        } />
      
      <Route path="*" element={
          <>
            {user && <Navigate to="/dashboard" />}
            {!user && <Navigate to="/login" />}
          </>
        } />
    </Routes>
  )
}

export default AllRoutes

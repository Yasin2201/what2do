import { Navigate, Route, Routes } from 'react-router-dom';
import { Profile } from '../features/users/routes/Profile';
import { Dashboard } from '../features/misc/routes/Dashboard';
import { Login } from '@/features/auth/routes/Login';
import { Register } from '@/features/auth/routes/Register';
import { MainLayout } from '@/components/Layout/MainLayout';
import { Groups } from '@/features/groups/routes/Groups';
import { Group } from '@/features/groups/routes/Group';
import { Activity } from '@/features/activitys/routes/Activity';
import { Activitys } from '@/features/activitys/routes/Activitys';
import { ActivityVoting } from '@/features/activitys/routes/ActivityVoting';

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

        <Route path="activitys/:status" element={
            <>
              {!user && <Navigate to="/login" />}
              {user && <Activitys />}
            </>
          } />

        <Route path="activitys/voting/:id" element={
            <>
              {!user && <Navigate to="/login" />}
              {user && <ActivityVoting />}
            </>
          } />
        
        <Route path="activity/:id" element={
            <>
              {!user && <Navigate to="/login" />}
              {user && <Activity />}
            </>
          } />

        <Route path="groups" element={
            <>
              {!user && <Navigate to="/login" />}
              {user && <Groups />}
            </>
          } />

        <Route path="group/:id" element={
            <>
              {!user && <Navigate to="/login" />}
              {user && <Group />}
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

import { Navigate, Route, Routes } from 'react-router-dom';

import { Profile } from '../features/users/routes/Profile';
import { MainLayout } from '@/components/Layout/MainLayout';
import { Dashboard } from '../features/misc/routes/Dashboard';
import { Login, Register } from '@/features/auth/routes';
import { Group, Groups } from '@/features/groups/routes';
import { Activity, Activitys, ActivityVoting, ActivityActive, ActivityCompleted, NewActivity } from '@/features/activitys/routes';


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

        <Route path="activitys/active/:id" element={
            <>
              {!user && <Navigate to="/login" />}
              {user && <ActivityActive />}
            </>
          } />

        <Route path="activitys/completed/:id" element={
            <>
              {!user && <Navigate to="/login" />}
              {user && <ActivityCompleted />}
            </>
          } />
        
        <Route path="activity/:id" element={
            <>
              {!user && <Navigate to="/login" />}
              {user && <Activity />}
            </>
          } />

        <Route path="activity/create" element={
            <>
              {!user && <Navigate to="/login" />}
              {user && <NewActivity />}
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

import { Navigate, Route, Routes } from 'react-router-dom';
import Profile from '../features/users/routes/Profile';
import Dashboard from '../features/misc/routes/Dashboard';

function ProtectedRoutes() {
  return (
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="/dash" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/dash"/>} />
    </Routes>
  )
}

export default ProtectedRoutes

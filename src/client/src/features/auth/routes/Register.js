import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../components/RegisterForm';

export const Login = () => {
  const navigate = useNavigate();

  return (
      <RegisterForm onSuccess={() => navigate('/dash')} />
  );
};
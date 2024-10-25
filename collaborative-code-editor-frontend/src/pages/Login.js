import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (response) => {
    console.log('Google login success:', response);
    // Redirect to the editor after login
    navigate('/editor');
  };

  const handleLoginFailure = () => {
    console.log('Login Failed');
  };

  return (
    <div>
      <h2>Login with Google</h2>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />
    </div>
  );
};

export default Login;

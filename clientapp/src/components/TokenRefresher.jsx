import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TokenRefresher = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert('Session expired. Please log in again.');
    sessionStorage.clear();
    navigate('../components/Pages/AuthPage.jsx');
  };

    const refreshTokenIfNeeded = async () => {
    const token = sessionStorage.getItem('token');
    const expiration = sessionStorage.getItem('expiration');
    const refreshToken = sessionStorage.getItem('refreshToken');

    if (!token || !expiration || !refreshToken) return;

    const now = new Date();
    const expirationDate = new Date(expiration);

    if (now >= expirationDate || (expirationDate - now) / 1000 < 60) {
      try {
        const response = await axios.post('https://localhost:7110/api/RfreshToken/RefreshToken', {
          Token: refreshToken,
          RefreshToken: refreshToken
        });

        const data = response.data;

        if (data?.token && data?.refreshToken && data?.expiration) {
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('refreshToken', data.refreshToken);
          sessionStorage.setItem('expiration', data.expiration);
          console.log('✅ Token refreshed successfully.');
        } else {
          console.error('⚠ Invalid refresh response structure');
          handleLogout();
        }
      } catch (error) {
        console.error('❌ Refresh token failed:', error);
        handleLogout();
      }
    }
  };

  useEffect(() => {
    console.log('🔁 Token refresher mounted');
    const interval = setInterval(() => {
      console.log('🔍 Checking token...');
      refreshTokenIfNeeded();
    }, 30 * 1000);

    return () => clearInterval(interval);
  }, []);

  return null; // مفيش UI هنا
};

export default TokenRefresher;
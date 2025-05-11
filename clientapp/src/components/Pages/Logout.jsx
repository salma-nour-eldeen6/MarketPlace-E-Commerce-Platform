import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    const performLogout = async () => {
      try {
      
        await axios.post('https://localhost:7110/api/User/logout', null, {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
          },
          signal: controller.signal
        });

        
        sessionStorage.clear();
        navigate('/', {
          replace: true,
          state: { logoutStatus: 'success' }
        });

      } catch (error) {
        if (!axios.isCancel(error)) {
          sessionStorage.clear();
          navigate('/', {
            replace: true,
            state: { logoutStatus: 'error' }
          });
        }
      }
    };

    performLogout();

    return () => controller.abort();
  }, [navigate]);

  return null;
};

export default Logout;

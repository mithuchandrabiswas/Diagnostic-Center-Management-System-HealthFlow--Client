import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
const useAxiosPrivate = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        // Add the Authorization header to the request if a token is available
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        return config;
      },
      error => {
        // Reject the request with an error
        return Promise.reject(error);
      }
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => {
        // Return the response if it's successful
        return response;
      },
      async error => {
        // Log the error response for debugging
        console.log('error tracked in the interceptor', error.response);
        const status = error.response ? error.response.status : null;
        if (status === 401 || status === 403) {
          // Log the user out and navigate to the login page on 401 or 403 errors
          await logOut();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    // Cleanup function to eject the interceptors when the component is unmounted
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [logOut, navigate]);

  return axiosPrivate;
};

export default useAxiosPrivate;

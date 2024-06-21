import axios from 'axios'
import useAuth from './useAuth'
import { useNavigate } from 'react-router-dom'

export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})
const useAxiosPrivate = () => {
  const { logOut } = useAuth()
  const navigate = useNavigate()

  // request interceptor to add authorization header for every secure call to teh api
  axiosPrivate.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access-token')
    // console.log('request stopped by interceptors', token)
    config.headers.authorization = `Bearer ${token}`;
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


  // intercepts 401 and 403 status
  axiosPrivate.interceptors.response.use(function (response) {
    return response;
  }, async (error) => {
    const status = error.response.status;
    // console.log('status error in the interceptor', status);
    // for 401 or 403 logout the user and move the user to the login
    if (status === 401 || status === 403) {
      await logOut();
      navigate('/login');
    }
    return Promise.reject(error);
  })


  return axiosPrivate;
};
export default useAxiosPrivate

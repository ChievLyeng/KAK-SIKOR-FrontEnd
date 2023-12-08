import axios from 'axios';
import { jwtDecode } from "jwt-decode";
// axios.defaults.withCredentials = true

const refreshToken = async () => {
  try {
    const res = await axios.post(
      'http://127.0.0.1:3000/api/v1/users/refresh-token',
      {
        // headers: {
        //   Authorization: `Bearer ${accessToken}`,
        //   refreshToken: refToken || '',
        // },
      },
      {
        withCredentials:true
      }
    );

    console.log('Refresh Token:', res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const createAxios = (user, dispatch, stateSuccess) => {
  // const accessToken = user?.token || '';
  // const refToken = user?.refreshToken || '';
  console.log('Calling axiosJWT!');
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwtDecode(user?.token);
      console.log('Decoded Token:', decodedToken);
      console.log(decodedToken.exp < date.getTime() / 1000)

      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshUser = {
          ...user,
          token: data.token,
          refreshToken: data.refreshToken,
        };
        console.log('data refresh:', data);
        dispatch(stateSuccess(refreshUser));
        config.headers["token"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};

// httpOnly: true,
//     sameSite: "none",
//     secure: true
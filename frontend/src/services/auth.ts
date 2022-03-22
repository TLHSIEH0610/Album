import { useQuery } from "react-query";
import { useMutation } from "react-query";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import service from "../utils/http";
import { apiUrl } from "utils/http";

export interface User {
  token: string;
  user: {
    _id: number;
    name: string;
    email: string;
  };
}

interface ILogin {
  password: string;
  email: string;
}

// const apiUrl = process.env.REACT_APP_DEV_URL;
const storageKey = "JWT_Token";

export const getToken = () => window.localStorage.getItem(storageKey);

// export const storeuser = ({ user }: { user: User }) => {
//   window.localStorage.setItem(storageKey, user.token || "");
//   return user;
// };

export const useLogin = () => {
  return useMutation(async ({ email, password }: ILogin) => {
    const config: AxiosRequestConfig = {
      method: "post",
      url: `${apiUrl}/users/login`,
      data: { email: email, password: password },
    };
    // return service(config);
    const { data }: { data: User } = await service(config);
    return data;
  });
};

// export const login = (data: { username: string; password: string }) => {
//   return fetch(`${apiUrl}/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   }).then(async (response) => {
//     if (response.ok) {
//       return storeuser(await response.json());
//     } else {
//       return Promise.reject(await response.json());
//     }
//   });
// };

export const useLogout = () => {
  return useMutation(
    async () => {
      const config: AxiosRequestConfig = {
        method: "post",
        url: `${apiUrl}/users/logout`,
        // data: { email: email, password: password },
      };
      // return service(config);
      return await service(config);
    },
    {
      onSuccess: () => {
        localStorage.clear();
      },
    }
  );
  // window.localStorage.removeItem(storageKey);
};

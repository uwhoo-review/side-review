import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export const axiosBaseInstance = axios.create({
  // baseURL: "https://api.themoviedb.org/3",
  // baseURL: "https://15.164.189.220:443",
  baseURL: "https://uwhoo-review.site/api",
  headers: {
    userId: null,
    // Authorization:
    //   "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OWJjZmNhOWZkNWY0NGQyMjZhYzgzMTU5NzZhY2ZkYyIsInN1YiI6IjY1MWUzMmE0M2QzNTU3MDExY2ZmZThhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-uufjYqYRvt2OC66c1euvWmZdEOGy-gGvmRoQ1fP2AA",
  },
});

export const axiosAuthInstance = axios.create({
  baseURL: "",
  headers: {},
});

const AxiosInterceptor = ({ children }: any) => {
  const [isRender, setIsRender] = useState(false);

  useEffect(() => {
    const requestInterceptor = axiosBaseInstance.interceptors.request.use(
      async (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosBaseInstance.interceptors.response.use(
      async (response: AxiosResponse) => {
        response.data = response.data ? response.data : response.data;
        return response;
      },
      async (error: AxiosError) => {
        const { config, response } = error;

        if (response) {
          const responseData = error.response?.data as any;
          const serverCode: string = responseData.code;
          switch (response.status) {
            case 400: {
              break;
            }
            /* token 만료 */
            case 401:
              break;
            /* 접근 권한 */
            case 403: {
              break;
            }
            /* 존재하지 않는 페이지 */
            case 404: {
              break;
            }
            default: {
              break;
            }
          }
        }

        return Promise.reject(error);
      }
    );
    return () => {
      axiosBaseInstance.interceptors.request.eject(requestInterceptor);
      axiosBaseInstance.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  useEffect(() => {
    setIsRender(true);
  });

  return isRender && children;
};

export { AxiosInterceptor };

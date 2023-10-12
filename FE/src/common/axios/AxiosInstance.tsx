import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export const axiosBaseInstance = axios.create({
  baseURL: "",
  headers: {},
});

export const axiosAuthInstance = axios.create({
  baseURL: "",
  headers: {},
});


const AxiosViewerInterceptor = ({ children }: any) => {
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

export { AxiosViewerInterceptor };

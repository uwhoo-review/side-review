import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useCommon } from "@src/providers/CommonProvider";
import { UWHOO_LOGIN } from "@src/variables/LoginConstants";
import { setCookie } from "@src/tools/commonTools";

export const axiosBaseInstance = axios.create({
  baseURL: "https://uwhoo-review.site/api",
  withCredentials: true,
  headers: {
    mode: process.env.MODE,
  },
});

const AxiosInterceptor = ({ children }: any) => {
  const [isRender, setIsRender] = useState(false);
  const commonContext = useCommon();

  useEffect(() => {
    const requestInterceptor = axiosBaseInstance.interceptors.request.use(
      async (config) => {
        if (config.headers) {
        }
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
          // const responseData = error.response?.data as any;
          // const serverCode: string = responseData.code;
          commonContext.onAlert({
            is: true,
            type: "error",
            title: <>{response.data}</>,
            children: "",
          });

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

        // return Promise.reject(error);
        return error;
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

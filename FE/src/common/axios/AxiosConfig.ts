import { axiosBaseInstance } from "@src/common/axios/AxiosInstance";

export const CODE_AXIOS = {};

export const UWAxios = {
  sample: {
    async getSample() {
      const res = await axiosBaseInstance.get(
          `contents`
      );

      return res.data;
    },
  },
  discover: {
    async getTvList() {
      const res = await axiosBaseInstance.get(
        `discover/tv?watch_region=KR&sort_by=popularity.desc`
      );

      return res.data;
    },
  },
  trending: {
    async getTvList() {
      const res = await axiosBaseInstance.get(`trending/tv/week?language=ko`);

      return res.data;
    },
  },
};

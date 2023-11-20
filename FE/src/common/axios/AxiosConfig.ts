import { axiosBaseInstance } from "@src/common/axios/AxiosInstance";
import { ContentsDO } from "@src/interfaces/api.interface";

export const CODE_AXIOS = {};

export const UWAxios = {
  sample: {
    async getSample(tab: string) {
      const res = await axiosBaseInstance.get<any>(`contents?tab=${tab}`);
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

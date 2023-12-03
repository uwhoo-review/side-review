import { axiosBaseInstance } from "@src/common/axios/AxiosInstance";
import { ContentsDO } from "@src/interfaces/api.interface";
import {createReviewAPI, updownReviewAPI} from "@src/interfaces/review.interface";

export const CODE_AXIOS = {};

export const UWAxios = {
  sample: {
    async getSample(data: any) {
      const res = await axiosBaseInstance.post<any>(`contents`, data);
      return res.data;
    },
  },
  contents: {
    async getContents(data: any) {
      const res = await axiosBaseInstance.post<any>(`contents`, data);
      return res.data;
    },
    async getContentsDetail(id: string) {
      const res = await axiosBaseInstance.get<any>(`contents/${id}`);
      return res.data;
    },
  },
  review: {
    async createReview(data: createReviewAPI) {
      const res = await axiosBaseInstance.post<any>(`review`, data);
      return res.data;
    },
    async getReview(id: string, sort: string, spoiler: boolean) {
      const res = await axiosBaseInstance.get<any>(
        `review?id=${id}&sort=${sort}&spoiler=${spoiler}`
      );
      return res.data;
    },
    async updownReview(data: updownReviewAPI) {
      const res = await axiosBaseInstance.put<any>(`review`, data);
      return res.data;
    },
  },
};

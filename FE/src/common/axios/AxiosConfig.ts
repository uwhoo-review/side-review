import { axiosBaseInstance } from "@src/common/axios/AxiosInstance";
import { createReviewAPI, updownReviewAPI } from "@src/interfaces/review.interface";
import { ContentsResDO } from "@src/interfaces/api.interface";

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
      const res = await axiosBaseInstance.post<ContentsResDO>(`contents`, data);
      return res.data;
    },
    async getContentsDetail(id: string) {
      const res = await axiosBaseInstance.get<any>(`contents/${id}`);
      return res.data;
    },
    async getSearchMatch(type: string, data: any) {
      const res = await axiosBaseInstance.post<any>(`contents/search/match?type=${type}`, data);
      return res.data;
    },
    async getSearchSimilar(data: any) {
      const res = await axiosBaseInstance.post<any>(`contents/search/similar`, data);
      return res.data;
    },
  },
  review: {
    async createReview(data: createReviewAPI) {
      const res = await axiosBaseInstance.post<any>(`review`, data);
      return res.data;
    },
    async getReview(id: string, sort: string, spoiler: boolean, page: number, size: number) {
      const res = await axiosBaseInstance.get<any>(
        `review/${id}?sort=${sort}&spoiler=${spoiler}&page=${page}&size=${size}`
      );
      return res.data;
    },
    async updownReview(data: updownReviewAPI) {
      const res = await axiosBaseInstance.put<any>(`review`, data);
      return res.data;
    },
  },
  person: {
    async getPersonDetail(id: string) {
      const res = await axiosBaseInstance.get<any>(`person/${id}`);
      return res.data;
    },
  },
  login: {
    async getNaverToken(code: string, state: string) {
      const res = await axiosBaseInstance.get<any>(`login/naver?code=${code}&state=${state}`);
      return res.data;
    },
    async getKakaoToken(code: string, uri: string) {
      const res = await axiosBaseInstance.get<any>(`login/kakao?code=${code}&uri=${uri}`);
      return res.data;
    },
    async getGoogleToken(code: string, uri: string) {
      const res = await axiosBaseInstance.get<any>(`login/google?code=${code}&uri=${uri}`);
      return res.data;
    },
  },
  star: {
    async postStart(id: string) {
      const res = await axiosBaseInstance.post<any>(`star/${id}`);
      return res.data;
    },
    async getStart(id: string) {
      const res = await axiosBaseInstance.get<any>(`star/${id}`);
      return res.data;
    },
    async deleteStart(id: string) {
      const res = await axiosBaseInstance.delete<any>(`star/${id}`);
      return res.data;
    },
    async putStart(id: string) {
      const res = await axiosBaseInstance.put<any>(`star/${id}`);
      return res.data;
    },
  },
};

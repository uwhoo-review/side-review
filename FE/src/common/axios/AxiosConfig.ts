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
      const res = await axiosBaseInstance.put<any>(`review`, data);
      return res.data;
    },
    async getReview(
      id: string,
      sort: string,
      spoiler: number,
      page: number,
      size: number,
      type?: string
    ) {
      const res = await axiosBaseInstance.get<any>(
        `review/${id}?sort=${sort}&spoiler=${spoiler}&page=${page}&size=${size}&type=${type || "0"}`
      );
      return res.data;
    },
    async updateEval(data: updownReviewAPI) {
      const res = await axiosBaseInstance.put<any>(`review/eval`, data);
      return res.data;
    },
    async deleteReview(reviewId: string) {
      const res = await axiosBaseInstance.delete<any>(`review?id=${reviewId}`);
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
    async getTestToken() {
      const res = await axiosBaseInstance.get<any>(`oauth2/authorization/naver`);
      return res.data;
    },
    async logout(type: string, token: string, redirectUrl: string) {
      const res = await axiosBaseInstance.get<any>(`logout?type=${type}&token=${token}&redirectUrl=${redirectUrl}`);
      return res.data;
    },
  },
  star: {
    async postStart(id: string, data: any) {
      const res = await axiosBaseInstance.post<any>(`star/${id}`, data);
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
    async putStart(id: string, data: any) {
      const res = await axiosBaseInstance.put<any>(`star/${id}`, data);
      return res.data;
    },
  },
  user: {
    async getMypage() {
      const res = await axiosBaseInstance.get<any>(`user`);
      return res.data;
    },
    async putNickName(nickName: string) {
      const res = await axiosBaseInstance.put<any>(`user/nickname?name=${nickName}`);
      return res.data;
    },
    async getMyStarCollect(page: number, size: number) {
      const res = await axiosBaseInstance.get<any>(`user/star?page=${page}&size=${size}`);
      return res.data;
    },
    async getMyReviewCollect(page: number, size: number) {
      const res = await axiosBaseInstance.get<any>(`user/review?page=${page}&size=${size}`);
      return res.data;
    },
    async getMyContents(keyword: string, page: number, size: number) {
      const res = await axiosBaseInstance.get<any>(
        `user/contents?keyword=${keyword}&page=${page}&size=${size}`
      );
      return res.data;
    },
    async getMyPerson(keyword: string, page: number, size: number) {
      const res = await axiosBaseInstance.get<any>(
        `user/person?keyword=${keyword}&page=${page}&size=${size}`
      );
      return res.data;
    },
    async putMyPerson(personId: string) {
      const res = await axiosBaseInstance.put<any>(`user/person?personId=${personId}`);
      return res.data;
    },
    async deleteMyPerson(personId: string) {
      const res = await axiosBaseInstance.delete<any>(`user/person?personId=${personId}`);
      return res.data;
    },
    async putMyContents(data: any) {
      const res = await axiosBaseInstance.put<any>(`user/contents`, data);
      return res.data;
    },
    async addMyContents(contentId: string) {
      const res = await axiosBaseInstance.post<any>(`user/contents?contentId=${contentId}`);
      return res.data;
    },
    async deleteMyContents(contentId: string) {
      const res = await axiosBaseInstance.delete<any>(`user/contents?contentId=${contentId}`);
      return res.data;
    },
    async putMyOtt(data: any) {
      const res = await axiosBaseInstance.put<any>(`user/ott`, data);
      return res.data;
    },
    async putMyGenre(data: any) {
      const res = await axiosBaseInstance.put<any>(`user/genre`, data);
      return res.data;
    },
    async subscribeOtt(ott: boolean) {
      const res = await axiosBaseInstance.put<any>(`user/ott/${ott}`);
      return res.data;
    },
  },
};

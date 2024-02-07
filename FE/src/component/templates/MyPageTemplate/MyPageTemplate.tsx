import MyPageHeader from "@src/component/organisms/MyPageGrid/Header/MyPageHeader";
import MyPageContent from "@src/component/organisms/MyPageGrid/Contents/MyPageContent";
import styled from "./style";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { useQuery } from "@tanstack/react-query";
import { useCommon } from "@src/providers/CommonProvider";
import LoadingGrid from "@src/component/organisms/LoadingGrid/LoadingGrid";

const MyPageTemplate = () => {
  const { userInfo } = useCommon();

  const { status, data, error } = useQuery({
    queryKey: ["user", userInfo.userId],
    queryFn: async () => {
      const res = userInfo.userId && (await UWAxios.user.getMypage(userInfo.userId));
      return res;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {status === "pending" && <LoadingGrid />}
      {status === "success" && (
        <section className={"mypage-template-wrapper"} css={styled.wrapper}>
          <MyPageHeader />
          <MyPageContent />
        </section>
      )}
    </>
  );
};

export default MyPageTemplate;

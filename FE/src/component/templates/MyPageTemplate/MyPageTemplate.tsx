import MyPageHeader from "@src/component/organisms/MyPageGrid/Header/MyPageHeader";
import MyPageContent from "@src/component/organisms/MyPageGrid/Contents/MyPageContent";
import styled from "./style";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { useQuery } from "@tanstack/react-query";
import { useCommon } from "@src/providers/CommonProvider";
import LoadingGrid from "@src/component/organisms/LoadingGrid/LoadingGrid";

const MyPageTemplate = () => {
  const { userInfo } = useCommon();

  console.log(userInfo);
  const { isLoading, data, error } = useQuery({
    queryKey: ["user", userInfo.id],
    queryFn: async () => {
      const res = userInfo.id && (await UWAxios.user.getMypage());
      return res;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {isLoading && <LoadingGrid />}
      {data && (
        <section className={"mypage-template-wrapper"} css={styled.wrapper}>
          <MyPageHeader data={data}/>
          <MyPageContent data={data}/>
        </section>
      )}
    </>
  );
};

export default MyPageTemplate;

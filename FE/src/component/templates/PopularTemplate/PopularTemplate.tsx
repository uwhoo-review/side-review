import styled from "./style";
import PopularContent from "@src/component/organisms/PopularGrid/Contents/PopularContent";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { useQuery } from "@tanstack/react-query";
import { CONTENTS_TABS } from "@src/variables/APIConstants";
import LoadingGrid from "@src/component/organisms/LoadingGrid/LoadingGrid";
import { QUERY_KEYS } from "@src/variables/QueryKeys";

const PopularTemplate = () => {
  const { status, data, error, isLoading } = useQuery({
    queryKey: QUERY_KEYS.popularTabs(),
    queryFn: async () =>
      await UWAxios.contents.getContents({ tab: CONTENTS_TABS.POPULARITY, pagination: 0 }),
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {isLoading && <LoadingGrid />}
      {status === "success" && (
        <section className="popular-template-wrapper" css={styled.wrapper}>
          <div css={styled.contents}>
            <PopularContent data={data} />
          </div>
        </section>
      )}
    </>
  );
};
export default PopularTemplate;

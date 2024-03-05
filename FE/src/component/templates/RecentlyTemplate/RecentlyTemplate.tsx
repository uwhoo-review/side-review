import styled from "./style";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { CONTENTS_TABS } from "@src/variables/APIConstants";
import { useQuery } from "@tanstack/react-query";
import LoadingGrid from "@src/component/organisms/LoadingGrid/LoadingGrid";
import PopularContent from "@src/component/organisms/PopularGrid/Contents/PopularContent";
import RecentlyContent from "@src/component/organisms/RecentlyGrid/Contents/RecentlyContent";
import {QUERY_KEYS} from "@src/variables/QueryKeys";

const RecentlyTemplate = () => {
  const { status, data, error, isLoading } = useQuery({
    queryKey: QUERY_KEYS.recentlyTabs(),
    queryFn: async () =>
      await UWAxios.contents.getContents({ tab: CONTENTS_TABS.NEW, pagination: 0 }),
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {isLoading && <LoadingGrid />}
      {status === "success" && (
        <section className="new-template-wrapper" css={styled.wrapper}>
          <div css={styled.contents}>
            <RecentlyContent data={data} />
          </div>
        </section>
      )}
    </>
  );
};
export default RecentlyTemplate;

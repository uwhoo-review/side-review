import styled from "./style";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { CONTENTS_TABS } from "@src/variables/APIConstants";
import LoadingGrid from "@src/component/organisms/LoadingGrid/LoadingGrid";
import PopularContent from "@src/component/organisms/PopularGrid/Contents/PopularContent";
import { useQuery } from "@tanstack/react-query";
import UpcomingContent from "@src/component/organisms/UpcomingGrid/Contents/UpcomingContent";

const UpcomingTemplate = () => {
  const { status, data, error } = useQuery({
    queryKey: ["list", CONTENTS_TABS.OPEN, 0],
    queryFn: async () =>
      await UWAxios.contents.getContents({ tab: CONTENTS_TABS.OPEN, pagination: 0 }),
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {status === "pending" && <LoadingGrid />}
      {status === "success" && (
        <section className="open-template-wrapper" css={styled.wrapper}>
          <div css={styled.contents}>
            <UpcomingContent data={data} />
          </div>
        </section>
      )}
    </>
  );
};
export default UpcomingTemplate;

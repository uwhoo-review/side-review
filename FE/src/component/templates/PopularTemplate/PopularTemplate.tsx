import styled from "./style";
import PopularContent from "@src/component/organisms/PopularGrid/Contents/PopularContent";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { useQuery } from "@tanstack/react-query";
import LoadingDot from "@src/component/atoms/LoadingDot/LoadingDot";
import { CONTENTS_TABS } from "@src/variables/APIConstants";
import LoadingGrid from "@src/component/organisms/LoadingGrid/LoadingGrid";
import MainContent from "@src/component/organisms/MainGrid/Contents/MainContent";

const PopularTemplate = () => {
  const { status, data, error } = useQuery({
    queryKey: ["list", "popularity"],
    queryFn: async () => await UWAxios.contents.getContents({ tab: CONTENTS_TABS.POPULARITY }),
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {status === "pending" && <LoadingGrid />}
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

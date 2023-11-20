import styled from "./style";
import PopularContent from "@src/component/organisms/PopularGrid/Contents/PopularContent";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { useQuery } from "@tanstack/react-query";
import LoadingDot from "@src/component/atoms/LoadingDot/LoadingDot";
import { CONTENTS_TABS } from "@src/variables/APIConstants";

const PopularTemplate = () => {
  const { status, data, error } = useQuery({
    queryKey: ["list", "popularity"],
    queryFn: async () => await UWAxios.sample.getSample({ tab: CONTENTS_TABS.POPULARITY }),
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className="popular-template-wrapper" css={styled.wrapper}>
        <div css={styled.contents}>
          {status === "pending" && <LoadingDot />}
          {status === "success" && <PopularContent data={data} />}
        </div>
      </div>
    </>
  );
};
export default PopularTemplate;

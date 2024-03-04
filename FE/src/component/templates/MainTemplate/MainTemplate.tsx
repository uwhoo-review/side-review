import MainContent from "@src/component/organisms/MainGrid/Contents/MainContent";
import styled from "./style";
import { useEffect } from "react";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingDot from "@src/component/atoms/LoadingDot/LoadingDot";
import { CONTENTS_TABS } from "@src/variables/APIConstants";
import LoadingGrid from "@src/component/organisms/LoadingGrid/LoadingGrid";
import {useCommon} from "@src/providers/CommonProvider";
import {LIST} from "@src/variables/QueryKeys";

const MainTemplate = () => {
  const { status, data, error, isLoading } = useQuery({
    queryKey: [LIST, CONTENTS_TABS.MAIN],
    queryFn: async () => await UWAxios.contents.getContents({ tab: CONTENTS_TABS.MAIN }),
    refetchOnWindowFocus: false,
  });

  console.log(status, isLoading, data)

  return (
    <>
      {isLoading && <LoadingGrid />}
      {status === "success" && (
        <section css={styled.wrapper}>
          <div css={styled.contents}>
            <MainContent data={data} />
          </div>
        </section>
      )}
    </>
  );
};
export default MainTemplate;

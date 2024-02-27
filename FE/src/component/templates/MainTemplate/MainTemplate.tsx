import MainContent from "@src/component/organisms/MainGrid/Contents/MainContent";
import styled from "./style";
import { useEffect } from "react";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingDot from "@src/component/atoms/LoadingDot/LoadingDot";
import { CONTENTS_TABS } from "@src/variables/APIConstants";
import LoadingGrid from "@src/component/organisms/LoadingGrid/LoadingGrid";
import {useCommon} from "@src/providers/CommonProvider";

const MainTemplate = () => {
  const queryClient = useQueryClient();
  const commonContext = useCommon();


  const { status, data, error } = useQuery({
    queryKey: ["list", CONTENTS_TABS.MAIN],
    queryFn: async () => await UWAxios.contents.getContents({ tab: CONTENTS_TABS.MAIN }),
    refetchOnWindowFocus: false,
  });

  console.log(data)

  return (
    <>
      {status === "pending" && <LoadingGrid />}
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

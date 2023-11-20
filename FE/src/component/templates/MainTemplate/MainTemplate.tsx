import MainContent from "@src/component/organisms/MainGrid/Contents/MainContent";
import styled from "./style";
import { useEffect } from "react";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingDot from "@src/component/atoms/LoadingDot/LoadingDot";
import {CONTENTS_TABS} from "@src/variables/APIConstants";

const MainTemplate = () => {
  const queryClient = useQueryClient();
  const { status, data, error } = useQuery({
    queryKey: ["main", "list"],
    queryFn: async () => await UWAxios.sample.getSample(CONTENTS_TABS.MAIN),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    console.log(data);
  }, [status]);

  return (
    <>
      <section css={styled.wrapper}>
        {status === "pending" && <LoadingDot />}
        {status === "success" && (
          <div css={styled.contents}>
            <MainContent data={data} />
          </div>
        )}
      </section>
    </>
  );
};
export default MainTemplate;

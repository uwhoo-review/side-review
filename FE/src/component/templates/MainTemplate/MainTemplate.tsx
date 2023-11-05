import MainContent from "@src/component/organisms/MainGrid/Contents/MainContent";
import styled from "./style";
import { useEffect } from "react";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const MainTemplate = () => {
  const queryClient = useQueryClient();
  const { status, data, error } = useQuery({
    queryKey: ["discover", "tv"],
    queryFn: async () => await UWAxios.sample.getSample(),
  });
  useEffect(() => {
    console.log(data);
  }, [status]);

  return (
    <>
      <section css={styled.wrapper}>
        {/*{status === "pending" && "loading"}*/}
        {(
            <MainContent data={data} />
        )}
      </section>
    </>
  );
};
export default MainTemplate;

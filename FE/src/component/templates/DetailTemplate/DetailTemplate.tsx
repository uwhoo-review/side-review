import styled from "./style";
import DetailGrid from "@src/component/organisms/DetailGrid/Contents/DetailGrid";
import BoxList from "@src/component/molecules/BoxList/BoxList";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { CONTENTS_TABS } from "@src/variables/APIConstants";
import {useParams, useSearchParams} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingGrid from "@src/component/organisms/LoadingGrid/LoadingGrid";
import MainContent from "@src/component/organisms/MainGrid/Contents/MainContent";

const DetailTemplate = () => {
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const { status, data, error } = useQuery({
    queryKey: ["list", "detail", id],
    queryFn: async () => {
      const detailRes = id && (await UWAxios.contents.getContentsDetail(id));
      return detailRes;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {status === "pending" && <LoadingGrid />}
      {status === "success" && (
        <section className="detail-template-wrapper" css={styled.wrapper}>
          <DetailGrid data={data} />
        </section>
      )}
    </>
  );
};

export default DetailTemplate;

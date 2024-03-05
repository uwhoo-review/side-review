import { UWAxios } from "@src/common/axios/AxiosConfig";
import LoadingGrid from "@src/component/organisms/LoadingGrid/LoadingGrid";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PersonHeader from "@src/component/organisms/PersonGrid/Header/PersonHeader";
import styled from "./style"
import PersonContent from "@src/component/organisms/PersonGrid/Contents/PersonContent";
import {QUERY_KEYS} from "@src/variables/QueryKeys";

const PersonTemplate = () => {
  const { id } = useParams();
  const { status, data, error } = useQuery({
    queryKey: QUERY_KEYS.person(id || ""),
    queryFn: async () => {
      return await UWAxios.person.getPersonDetail(id || "");
    },
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {status === "pending" && <LoadingGrid />}
      {status === "success" && (
        <section className="detail-template-wrapper" css={styled.wrapper}>
          <PersonHeader data={data} />
          <PersonContent data={data} />
        </section>
      )}
    </>
  );
};

export default PersonTemplate;

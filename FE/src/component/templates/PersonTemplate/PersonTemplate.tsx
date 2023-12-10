import { UWAxios } from "@src/common/axios/AxiosConfig";
import LoadingGrid from "@src/component/organisms/LoadingGrid/LoadingGrid";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PersonHeader from "@src/component/organisms/PersonGrid/Header/PersonHeader";
import styled from "./style"
import PersonContent from "@src/component/organisms/PersonGrid/Contents/PersonContent";

const PersonTemplate = () => {
  const { id } = useParams();
  const { status, data, error } = useQuery({
    queryKey: ["list", "person", id],
    queryFn: async () => {
      return await UWAxios.person.getPersonDetail("974169");
    },
    refetchOnWindowFocus: false,
  });

  // useEffect(() => {}, [status]);

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

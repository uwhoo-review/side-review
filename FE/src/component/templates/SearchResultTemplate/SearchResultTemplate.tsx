import styled from "./style";
import SearchResultHeader from "@src/component/organisms/SearchResultGrid/Header/SearchResultHeader";
import SearchResultContent from "@src/component/organisms/SearchResultGrid/Contents/SearchResultContent";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { CONTENTS_TABS } from "@src/variables/APIConstants";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import LoadingDot from "@src/component/atoms/LoadingDot/LoadingDot";
import { useParams, useSearchParams } from "react-router-dom";
import { useCommon } from "@src/providers/CommonProvider";
import { getFilterParams } from "@src/tools/commonTools";

const SearchResultTemplate = () => {
  const [searchParams] = useSearchParams();
  const filter = getFilterParams(searchParams);
  const search = searchParams.get("search");
  const sort = searchParams.get("sort");
  const { status, data, error } = useQuery({
    queryKey: ["list", "search", filter, search, sort],
    queryFn: async () => {
      return await UWAxios.sample.getSample({
        tab: CONTENTS_TABS.SEARCH,
        filter: [...filter],
        query: search,
        sort: sort,
      });
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {}, [status]);

  return (
    <>
      <div className="detail-template-wrapper" css={styled.wrapper}>
        {status === "pending" && <LoadingDot />}
        {status === "success" && (
          <>
            <SearchResultHeader data={data} />
            <SearchResultContent data={data} />
          </>
        )}
      </div>
    </>
  );
};

export default SearchResultTemplate;

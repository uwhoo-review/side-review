import styled from "./style";
import SearchResultContent from "@src/component/organisms/SearchResultGrid/Contents/SearchResultContent";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { CONTENTS_TABS } from "@src/variables/APIConstants";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import LoadingDot from "@src/component/atoms/LoadingDot/LoadingDot";
import { useParams, useSearchParams } from "react-router-dom";
import { useCommon } from "@src/providers/CommonProvider";
import { getFilterParams, isNullOrEmpty } from "@src/tools/commonTools";
import FilterResultContents from "@src/component/organisms/SearchResultGrid/Contents/FilterResultContent";
import ResultHeader from "@src/component/organisms/SearchResultGrid/Header/ResultHeader";
import LoadingGrid from "@src/component/organisms/LoadingGrid/LoadingGrid";
import MainContent from "@src/component/organisms/MainGrid/Contents/MainContent";

const SearchResultTemplate = () => {
  const [searchParams] = useSearchParams();
  const filter = getFilterParams(searchParams);
  const search = searchParams.get("search");
  const sort = searchParams.get("sort");
  const { status, data, error } = useQuery({
    queryKey: ["list", "search", filter, search, sort],
    queryFn: async () => {
      return await UWAxios.contents.getSearch({
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
      {status === "pending" && <LoadingGrid />}
      {status === "success" && (
        <section className="detail-template-wrapper" css={styled.wrapper}>
          <ResultHeader data={data} />
          {isNullOrEmpty(search) ? (
            <>
              <FilterResultContents data={data} />
            </>
          ) : (
            <>
              <SearchResultContent data={data} />
            </>
          )}
        </section>
      )}
    </>
  );
};

export default SearchResultTemplate;

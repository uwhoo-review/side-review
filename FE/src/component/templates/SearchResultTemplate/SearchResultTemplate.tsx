import styled from "./style";
import SearchResultContent from "@src/component/organisms/SearchResultGrid/Contents/SearchResultContent";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { CONTENTS_TABS } from "@src/variables/APIConstants";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import LoadingDot from "@src/component/atoms/LoadingDot/LoadingDot";
import { useParams, useSearchParams } from "react-router-dom";
import { useCommon } from "@src/providers/CommonProvider";
import { getFilterParams, isNullOrEmpty } from "@src/tools/commonTools";
import FilterResultContents from "@src/component/organisms/SearchResultGrid/Contents/FilterResultContent";
import ResultHeader from "@src/component/organisms/SearchResultGrid/Header/ResultHeader";
import LoadingGrid from "@src/component/organisms/LoadingGrid/LoadingGrid";
import MainContent from "@src/component/organisms/MainGrid/Contents/MainContent";
import { QUERY_KEYS } from "@src/variables/QueryKeys";

const SearchResultTemplate = () => {
  const [searchParams] = useSearchParams();
  const filter = getFilterParams(searchParams);
  const search = searchParams.get("search");
  const sort = searchParams.get("sort");
  const useMatchContent = useQuery({
    queryKey: QUERY_KEYS.searchContent({ filter, search, sort, p: 0 }),
    queryFn: async ({ queryKey }: any) => {
      return await UWAxios.contents.getSearchMatch(queryKey[2], {
        tab: CONTENTS_TABS.SEARCH,
        filter: [...queryKey[3]],
        query: queryKey[4],
        sort: queryKey[5],
        pagination: queryKey[6],
      });
    },
    refetchOnWindowFocus: false,
  });
  const useMatchPerson = useQuery({
    queryKey: QUERY_KEYS.searchPerson({ filter, search, sort, p: 0 }),
    queryFn: async ({ queryKey }: any) => {
      return await UWAxios.contents.getSearchMatch(queryKey[2], {
        tab: CONTENTS_TABS.SEARCH,
        filter: [...queryKey[3]],
        query: queryKey[4],
        sort: queryKey[5],
        pagination: queryKey[6],
      });
    },
    refetchOnWindowFocus: false,
    enabled: !!search,
  });
  const useMatchSimilar = useQuery({
    queryKey: QUERY_KEYS.searchSimilar({ filter, search, sort, p: 0 }),
    queryFn: async ({ queryKey }: any) => {
      return await UWAxios.contents.getSearchSimilar({
        tab: CONTENTS_TABS.SEARCH,
        filter: [...queryKey[3]],
        query: queryKey[4],
        sort: queryKey[5],
        pagination: queryKey[6],
      });
    },
    refetchOnWindowFocus: false,
    enabled: !!search,
  });

  return (
    <>
      {useMatchContent.status === "pending" &&
        (!search ||
          (useMatchPerson.status === "pending" && useMatchSimilar.status === "pending")) && (
          <LoadingGrid />
        )}
      {useMatchContent.status === "success" &&
        (!search ||
          (useMatchPerson.status === "success" && useMatchSimilar.status === "success")) && (
          <section className="detail-template-wrapper" css={styled.wrapper}>
            <ResultHeader content={useMatchContent.data} />
            {isNullOrEmpty(search) ? (
              <>
                <FilterResultContents
                  content={useMatchContent.data}
                  total={useMatchContent.data.total}
                  filter={filter}
                  search={search}
                  sort={sort}
                  pagination={0}
                />
              </>
            ) : (
              <>
                <SearchResultContent
                  content={useMatchContent.data}
                  person={useMatchPerson.data}
                  similar={useMatchSimilar.data}
                  filter={filter}
                  search={search}
                  sort={sort}
                  pagination={0}
                />
              </>
            )}
          </section>
        )}
    </>
  );
};

export default SearchResultTemplate;

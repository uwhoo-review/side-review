import HWTextField from "@src/component/atoms/HWTextField/HWTextField";
import { IconCancel, IconInit, IconSearch } from "@res/index";
import styled from "./style";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import HWButton from "@src/component/atoms/HWButton/HWButton";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isNullOrEmpty } from "@src/tools/commonTools";
import { useCommon } from "@src/providers/CommonProvider";
import HWIconButton from "@src/component/atoms/HWIconButton/HWIconButton";
const SearchBar = () => {
  const navigate = useNavigate();
  const { filterState, filterRef, onHandleFilter, onHandleFilterOpen } = useCommon();

  // const [search, setSearch] = useState<string>("");
  const onResult = () => {
    let queryStr = "?";
    queryStr += filterState.search.length !== 0 ? `search=${filterState.search}` : "";
    queryStr += filterState.genre.length !== 0 ? `&genre=${filterState.genre}` : "";
    queryStr += filterState.platform.length !== 0 ? `&platform=${filterState.platform}` : "";
    queryStr += filterState.watch.length !== 0 ? `&watch=${filterState.watch}` : "";
    queryStr +=
      filterState.rating[0] !== 0 || filterState.rating[1] !== 5
        ? `&rating=${filterState.rating}`
        : "";
    queryStr +=
      filterState.date[0] !== null || filterState.date[1] !== null
        ? `&date=${filterState.date}`
        : "";
    queryStr += filterState.sort ? `&sort=${filterState.sort}` : "";

    onHandleFilterOpen(false);
    navigate({ pathname: "/search", search: `${queryStr}` });
  };

  /*  useEffect(() => {
    onHandleFilter({
      search,
    });
  }, [search]);

  useEffect(() => {
    setSearch(filterState.search);
  }, [filterState.search]);*/

  return (
    <div css={styled.wrapper}>
      <div css={styled.searchGroups}>
        <HWTextField
          inputRef={filterRef.searchRef}
          label={"어떤 작품을 찾으세요?"}
          startAdorment={<IconSearch />}
          endAdorment={
            !isNullOrEmpty(filterState.search) && (
              <HWIconButton
                onClick={() => {
                  onHandleFilter({
                    search: "",
                  });
                }}
              >
                <IconCancel />
              </HWIconButton>
            )
          }
          placeholder={"제목, 이물 검색"}
          fullWidth={true}
          value={filterState.search}
          onChange={(e) => onHandleFilter({ search: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onResult();
            }
          }}
        />
        <div css={styled.searchBtnGroups}>
          <HWButton
            variant={"lowest"}
            size={"large"}
            onClick={() => {
              onHandleFilter({
                search: "",
                genre: [],
                platform: [],
                watch: [],
                rating: [0, 5],
                date: [null, null],
                sort: "",
              });
            }}
          >
            <IconInit />
            <div>초기화</div>
          </HWButton>
          <HWButton
            variant={"primary"}
            onClick={() => {
              onResult();
            }}
          >
            적용
          </HWButton>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

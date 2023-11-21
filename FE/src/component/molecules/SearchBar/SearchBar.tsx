import HWTextField from "@src/component/atoms/HWTextField/HWTextField";
import { IconCancel, IconInit, IconSearch } from "@res/index";
import styled from "./style";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import HWButton from "@src/component/atoms/HWButton/HWButton";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isNullOrEmpty } from "@src/tools/commonTools";
import { useCommon } from "@src/providers/CommonProvider";
const SearchBar = () => {
  const navigate = useNavigate();
  const commonContext = useCommon();

  const [search, setSearch] = useState<string>("");
  const onResult = () => {
    let queryStr = "?";
    queryStr +=
      commonContext.filterState.search.length !== 0
        ? `search=${commonContext.filterState.search}`
        : "";
    queryStr +=
      commonContext.filterState.genre.length !== 0
        ? `&genre=${commonContext.filterState.genre}`
        : "";
    queryStr +=
      commonContext.filterState.platform.length !== 0
        ? `&platform=${commonContext.filterState.platform}`
        : "";
    queryStr +=
      commonContext.filterState.watch.length !== 0
        ? `&watch=${commonContext.filterState.watch}`
        : "";
    queryStr +=
      commonContext.filterState.rating[0] !== 0 || commonContext.filterState.rating[1] !== 5
        ? `&rating=${commonContext.filterState.rating}`
        : "";
    queryStr +=
      commonContext.filterState.date[0] !== null || commonContext.filterState.date[1] !== null
        ? `&date=${commonContext.filterState.date}`
        : "";
    queryStr += commonContext.filterState.sort ? `&sort=${commonContext.filterState.sort}` : "";

    console.log(queryStr);
    commonContext.onHandleFilterOpen(false);
    navigate({ pathname: "/search", search: `${queryStr}` });
  };

  useEffect(() => {
    commonContext.onHandleFilter({
      search,
    });
  }, [search]);

  return (
    <div css={styled.wrapper}>
      <div css={styled.searchGroups}>
        <HWTextField
          inputRef={commonContext.filterRef.searchRef}
          label={"어떤 작품을 찾으세요?"}
          startAdorment={<IconSearch />}
          endAdorment={!isNullOrEmpty(search) && <IconCancel />}
          placeholder={"제목, 이물 검색"}
          fullWidth={true}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (!isNullOrEmpty(search)) onResult();
            }
          }}
        />
        <div css={styled.searchBtnGroups}>
          <HWButton
            variant={"lowest"}
            size={"large"}
            onClick={() => {
              if (commonContext.filterRef.searchRef?.current) {
                commonContext.filterRef.searchRef.current.focus();
                // inputRef.current.click()
              }
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

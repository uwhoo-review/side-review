import HWTextField from "@src/component/atoms/HWTextField/HWTextField";
import { IconCancel, IconInit, IconSearch } from "@res/index";
import styled from "./style";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import HWButton from "@src/component/atoms/HWButton/HWButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
  const navigate = useNavigate();
  const [textVal, setTextVal] = useState<string>("string");

  return (
    <div css={styled.wrapper}>
      <HWTypography variant={"bodyS"} css={styled.typography}>
        어떤 작품을 찾으세요?
      </HWTypography>
      <div css={styled.searchGroups}>
        <HWTextField
          startAdorment={<IconSearch />}
          endAdorment={<IconCancel />}
          placeholder={"제목, 이물 검색"}
          fullWidth={true}
          value={textVal}
          onChange={(e) => setTextVal(e.target.value)}
        />
        <div css={styled.searchBtnGroups}>
          <HWButton variant={"lowest"}>
            <IconInit />
            <div>초기화</div>
          </HWButton>
          <HWButton
            variant={"primary"}
            onClick={() => {
              navigate({ pathname: "/search", search: `?query=${textVal}` });
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

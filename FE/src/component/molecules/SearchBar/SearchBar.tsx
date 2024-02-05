import HWTextField from "@src/component/atoms/HWTextField/HWTextField";
import { IconCancel, IconCheckboxOff, IconCheckboxOn, IconInit, IconSearch } from "@res/index";
import styled from "./style";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import HWButton from "@src/component/atoms/HWButton/HWButton";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isNullOrEmpty } from "@src/tools/commonTools";
import { useCommon } from "@src/providers/CommonProvider";
import HWIconButton from "@src/component/atoms/HWIconButton/HWIconButton";
import HWOutlinedSelectBox from "@src/component/atoms/HWOutlinedSelectBox";
import HWChip from "@src/component/atoms/HWChip/HWChip";
import {
  FILTER_SORT_ID,
  FILTER_SORT_ID_NAME,
  GENRE_ID,
  GENRE_ID_NAME,
  PLATFORM_ID,
  PLATFORM_ID_NAME,
  WATCH_RATING_ID, WATCH_RATING_ID_NAME, WATCH_RATING_NAME,
} from "@src/variables/CommonConstants";
import CustomInputField from "@src/component/atoms/CustomInputField/CustomInputField";
import HWSlider from "@src/component/atoms/HWSlider/HWSlider";
import HWCheckBox from "@src/component/atoms/HWCheckBox/HWCheckBox";
const SearchBar = () => {
  const navigate = useNavigate();
  const { filterState, filterRef, onHandleFilter, onHandleFilterOpen, isFilterOpen } = useCommon();

  const onResult = () => {
    const query = [];
    filterState.search.length !== 0 && query.push(`search=${filterState.search}`);
    filterState.genre.length !== 0 && query.push(`genre=${filterState.genre}`);
    filterState.platform.length !== 0 && query.push(`platform=${filterState.platform}`);
    filterState.watch.length !== 0 && query.push(`watch=${filterState.watch}`);
    (filterState.rating[0] !== 0 || filterState.rating[1] !== 5) &&
      query.push(`rating=${filterState.rating}`);
    (filterState.date[0] !== null || filterState.date[1] !== null) &&
      query.push(`date=${filterState.date}`);
    filterState.sort && query.push(`sort=${filterState.sort}`);

    navigate({ pathname: "/search", search: `?${query.join("&")}` });
    onHandleFilterOpen(false);
  };

  useEffect(() => {
    if(isFilterOpen) filterRef.searchRef.current.focus();
  },[isFilterOpen])


  return (
    <div css={styled.wrapper}>
      <div css={styled.box}>
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
            placeholder={"제목, 인물을 검색하세요."}
            fullWidth={true}
            value={filterState.search}
            onChange={(e) => onHandleFilter({ search: e.target.value })}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                onResult();
              }
            }}
          />
          <div>
            <HWOutlinedSelectBox
              label={"정렬"}
              placeholder={"정렬"}
              value={filterState.sort}
              onChange={(e) => {
                const value = e.target.value;
                onHandleFilter({
                  sort: value,
                });
              }}
              inputRef={filterRef.sortRef}
            >
              {Object.entries(FILTER_SORT_ID).map(([key, value]) => (
                <HWOutlinedSelectBox.Item key={key} value={value}>
                  {FILTER_SORT_ID_NAME[value]}
                </HWOutlinedSelectBox.Item>
              ))}
            </HWOutlinedSelectBox>
          </div>
        </div>
      </div>
      <div css={styled.box2}>
        <div css={styled.filterGroups}>
          <HWOutlinedSelectBox
            label={"필터"}
            multiple
            placeholder={"장르"}
            value={filterState.genre}
            onChange={(e) => {
              const value = e.target.value;
              onHandleFilter({ genre: [...value] });
            }}
            renderValue={(values: any) => (
              <div css={styled.multiBox}>
                {values.map((v: any) => {
                  return <HWChip key={v} label={GENRE_ID_NAME[v]} css={styled.chip} />;
                })}
              </div>
            )}
            inputRef={filterRef.genreRef}
            fullWidth={true}
          >
            {Object.entries(GENRE_ID).map(([key, value]) => (
              <HWOutlinedSelectBox.Item key={key} value={value}>
                {GENRE_ID_NAME[value]}
              </HWOutlinedSelectBox.Item>
            ))}
          </HWOutlinedSelectBox>
          <HWOutlinedSelectBox
            label={""}
            multiple
            placeholder={"플랫폼"}
            value={filterState.platform}
            onChange={(e) => {
              const value = e.target.value;
              onHandleFilter({ platform: [...value] });
            }}
            renderValue={(values: any) => (
              <div css={styled.multiBox}>
                {values.map((v: any) => (
                  <HWChip key={v} label={PLATFORM_ID_NAME[v]} css={styled.chip} />
                ))}
              </div>
            )}
            inputRef={filterRef.platformRef}
            fullWidth={true}
          >
            {Object.entries(PLATFORM_ID).map(([key, value]) => (
              <HWOutlinedSelectBox.Item key={key} value={value}>
                {PLATFORM_ID_NAME[value]}
              </HWOutlinedSelectBox.Item>
            ))}
          </HWOutlinedSelectBox>
          <HWOutlinedSelectBox
            label={""}
            multiple
            placeholder={"시청등급"}
            value={filterState.watch}
            onChange={(e) => {
              const value = e.target.value;
              onHandleFilter({ watch: [...value] });
            }}
            renderValue={(values: any) => (
              <div css={styled.multiBox}>
                {values.map((v: any) => (
                  <HWChip key={v} label={WATCH_RATING_ID_NAME[v]} css={styled.chip} />
                ))}
              </div>
            )}
            inputRef={filterRef.watchRef}
            fullWidth={true}
          >
            {Object.entries(WATCH_RATING_ID).map(([key, value]) => (
              <HWOutlinedSelectBox.Item key={key} value={value}>
                {WATCH_RATING_ID_NAME[value]}
              </HWOutlinedSelectBox.Item>
            ))}
          </HWOutlinedSelectBox>
          <CustomInputField
            label={""}
            placeholder={"평점"}
            value={filterState.rating}
            renderValue={(v: any) => `${v[0]}점 - ${v[1]}점`}
            inputRef={filterRef.ratingRef}
            fullWidth={true}
          >
            <div css={styled.sliderWrapper}>
              <HWSlider
                min={0}
                max={5}
                step={0.5}
                value={filterState.rating}
                track="normal"
                valueLabelDisplay={"on"}
                onChange={(e, newValue: number | number[]) => {
                  onHandleFilter({ rating: newValue as number[] });
                }}
              />
            </div>
          </CustomInputField>
          <CustomInputField
            label={""}
            placeholder={"개봉연도"}
            value={
              (filterState.date[0] !== null || filterState.date[1] !== null) &&
              filterState.date.join(" - ")
            }
            inputRef={filterRef.yearRef}
            fullWidth={true}
          >
            <div css={styled.yearRangeWrapper}>
              <div css={styled.yearRangeGroups}>
                <HWTextField
                  value={filterState.date[0] || undefined}
                  width={"122px"}
                  maxLength={4}
                  type={"text"}
                  placeholder={"YYYY"}
                  onChange={(e) => {
                    return onHandleFilter({
                      date: [Number(e.target.value) || null, filterState.date[1]],
                    });
                  }}
                />
                <div>-</div>
                <HWTextField
                  value={filterState.date[1] || undefined}
                  width={"122px"}
                  maxLength={4}
                  type={"text"}
                  placeholder={"YYYY"}
                  onChange={(e) => {
                    return onHandleFilter({
                      date: [filterState.date[0], Number(e.target.value) || null],
                    });
                  }}
                />
              </div>
              <div css={styled.currentYear}>
                <HWCheckBox
                  checked={
                    filterState.date[0] === new Date().getFullYear() &&
                    filterState.date[1] === new Date().getFullYear()
                  }
                  icon={<IconCheckboxOff />}
                  checkedIcon={<IconCheckboxOn />}
                  onChange={(checked) => {
                    if (checked)
                      onHandleFilter({
                        date: [new Date().getFullYear(), new Date().getFullYear()],
                      });
                  }}
                  label={<HWTypography variant={"bodyXS"}>올해로 설정</HWTypography>}
                />
              </div>
            </div>
          </CustomInputField>
        </div>
      </div>
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
              sort: "popularity",
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
  );
};

export default SearchBar;

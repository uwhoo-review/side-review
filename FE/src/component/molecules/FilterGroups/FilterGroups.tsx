import { useEffect, useRef, useState } from "react";
import styled from "./style";
import HWOutlinedSelectBox from "@src/component/atoms/HWOutlinedSelectBox";
import { SelectChangeEvent } from "@mui/material";
import HWChip from "@src/component/atoms/HWChip/HWChip";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import CustomInputField from "@src/component/atoms/CustomInputField/CustomInputField";
import HWSlider from "@src/component/atoms/HWSlider/HWSlider";
import HWTextField from "@src/component/atoms/HWTextField/HWTextField";
import HWCheckBox from "@src/component/atoms/HWCheckBox/HWCheckBox";
import { IconCheckboxOff, IconCheckboxOn } from "@res/index";
import {
  FILTER_SORT,
  GENRE_ID,
  GENRE_NAME,
  PLATFORM_ID,
  PLATFORM_NAME,
  WATCH_RATING,
} from "@src/variables/CommonConstants";
import { useCommon } from "@src/providers/CommonProvider";

const FilterGroups = () => {
  const commonContext = useCommon();

  const [value, setValue] = useState<string[]>([]);

  const handleChange = (e: SelectChangeEvent<string[]>) => {
    const { value } = e.target;
    setValue(typeof value === "string" ? value.split(",") : [...value]);
  };

  const [genre, setGenre] = useState<any[]>(commonContext.filterState.genre);
  const [platform, setPlatform] = useState<any[]>(commonContext.filterState.platform);
  const [watch, setWatch] = useState<string[]>([]);
  const [rating, setRating] = useState<number[]>([0, 5]);
  const [date, setDate] = useState<(number | null)[]>([null, null]);
  const [sort, setSort] = useState<string>("");

  useEffect(() => {
    commonContext.onHandleFilter({
      genre,
      platform,
      watch,
      rating,
      date,
      sort,
    });
  }, [genre, platform, watch, rating, date, sort]);

  return (
    <div css={styled.wrapper}>
      <div css={styled.filterGroups}>
        <HWOutlinedSelectBox
          label={"필터"}
          multiple
          placeholder={"장르"}
          value={genre}
          onChange={(e) => {
            const value = e.target.value;
            setGenre([...value]);
          }}
          renderValue={(values: any) => (
            <div css={styled.multiBox}>
              {values.map((v: any) => {
                return <HWChip key={v} label={GENRE_NAME[v]} css={styled.chip} />;
              })}
            </div>
          )}
          disablePortal={true}
          inputRef={commonContext.filterRef.genreRef}
        >
          {Object.entries(GENRE_ID).map(([key, value]) => (
            <HWOutlinedSelectBox.Item key={key} value={value}>
              {GENRE_NAME[value]}
            </HWOutlinedSelectBox.Item>
          ))}
        </HWOutlinedSelectBox>
        <HWOutlinedSelectBox
          label={""}
          multiple
          placeholder={"플랫폼"}
          value={platform}
          onChange={(e) => {
            const value = e.target.value;
            setPlatform([...value]);
          }}
          renderValue={(values: any) => (
            <div css={styled.multiBox}>
              {values.map((v: any) => (
                <HWChip key={v} label={PLATFORM_NAME[v]} css={styled.chip} />
              ))}
            </div>
          )}
          inputRef={commonContext.filterRef.platformRef}
        >
          {Object.entries(PLATFORM_ID).map(([key, value]) => (
            <HWOutlinedSelectBox.Item key={key} value={value}>
              {PLATFORM_NAME[value]}
            </HWOutlinedSelectBox.Item>
          ))}
        </HWOutlinedSelectBox>
        <HWOutlinedSelectBox
          label={""}
          multiple
          placeholder={"시청등급"}
          value={watch}
          onChange={(e) => {
            const value = e.target.value;
            setWatch([...value]);
          }}
          renderValue={(values: any) => (
            <div css={styled.multiBox}>
              {values.map((v: any) => (
                <HWChip key={v} label={v} css={styled.chip} />
              ))}
            </div>
          )}
          inputRef={commonContext.watchRef}
        >
          {Object.entries(WATCH_RATING).map(([key, value]) => (
            <HWOutlinedSelectBox.Item key={key} value={value}>
              {value}
            </HWOutlinedSelectBox.Item>
          ))}
        </HWOutlinedSelectBox>
        <CustomInputField
          label={""}
          placeholder={"평점"}
          value={rating}
          renderValue={(v: any) => `${v[0]}점 - ${v[1]}점`}
          inputRef={commonContext.filterRef.ratingRef}
        >
          <div css={styled.sliderWrapper}>
            <HWSlider
              min={0}
              max={5}
              step={0.5}
              value={rating}
              track="normal"
              valueLabelDisplay={"on"}
              onChange={(e, newValue: number | number[]) => {
                setRating(newValue as number[]);
              }}
            />
          </div>
        </CustomInputField>
        <CustomInputField
          label={""}
          placeholder={"개봉연도"}
          value={(date[0] !== null || date[1] !== null) && date.join(" - ")}
          inputRef={commonContext.filterRef.yearRef}
        >
          <div css={styled.yearRangeWrapper}>
            <div css={styled.yearRangeGroups}>
              <HWTextField
                value={date[0] || undefined}
                width={"122px"}
                maxLength={4}
                type={"text"}
                onChange={(e) => {
                  return setDate([Number(e.target.value) || null, date[1]]);
                }}
              />
              <div>-</div>
              <HWTextField
                value={date[1] || undefined}
                width={"122px"}
                maxLength={4}
                type={"text"}
                onChange={(e) => {
                  return setDate([date[0], Number(e.target.value) || null]);
                }}
              />
            </div>
            <div css={styled.currentYear}>
              <HWCheckBox
                checked={
                  date[0] === new Date().getFullYear() && date[1] === new Date().getFullYear()
                }
                icon={<IconCheckboxOff />}
                checkedIcon={<IconCheckboxOn />}
                onChange={(checked) => {
                  if (checked) setDate([new Date().getFullYear(), new Date().getFullYear()]);
                }}
                label={<HWTypography variant={"bodyXS"}>올해로 설정</HWTypography>}
              />
            </div>
          </div>
        </CustomInputField>

        <HWOutlinedSelectBox
          label={"인기순"}
          placeholder={"정렬"}
          value={sort}
          onChange={(e) => {
            const value = e.target.value;
            setSort(value);
          }}
          inputRef={commonContext.filterRef.sortRef}
        >
          {Object.entries(FILTER_SORT).map(([key, value]) => (
            <HWOutlinedSelectBox.Item key={key} value={value}>
              {value}
            </HWOutlinedSelectBox.Item>
          ))}
        </HWOutlinedSelectBox>
      </div>
    </div>
  );
};

export default FilterGroups;

import { useState } from "react";
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
  GENRE,
  PLATFORM,
  WATCH_RATING,
} from "@src/variables/CommonConstants";

const FilterGroups = () => {
  const [value, setValue] = useState<string[]>([]);
  const handleChange = (e: SelectChangeEvent<string[]>) => {
    const { value } = e.target;
    setValue(typeof value === "string" ? value.split(",") : [...value]);
  };
  const [genre, setGenre] = useState<string[]>([]);
  const [platform, setPlatform] = useState<string[]>([]);
  const [watchRating, setWatchRating] = useState<string[]>([]);
  const [sliderValue, setSliderValue] = useState<number[]>([0, 5]);
  const [yearRange, setYearRange] = useState<(number | undefined)[]>([undefined, undefined]);
  const [sort, setSort] = useState<string>("");

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
                return <HWChip key={v} label={v} css={styled.chip} />;
              })}
            </div>
          )}
        >
          {Object.entries(GENRE).map(([key, value]) => (
            <HWOutlinedSelectBox.Item key={key} value={value}>
              {value}
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
                <HWChip key={v} label={v} css={styled.chip} />
              ))}
            </div>
          )}
        >
          {Object.entries(PLATFORM).map(([key, value]) => (
            <HWOutlinedSelectBox.Item key={key} value={value}>
              {value}
            </HWOutlinedSelectBox.Item>
          ))}
        </HWOutlinedSelectBox>
        <HWOutlinedSelectBox
          label={""}
          placeholder={"시청등급"}
          value={watchRating}
          onChange={(e) => {
            const value = e.target.value;
            setWatchRating([...value]);
          }}
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
          value={sliderValue}
          renderValue={(v: any) => `${v[0]}점 - ${v[1]}점`}
        >
          <div css={styled.sliderWrapper}>
            <HWSlider
              min={0}
              max={5}
              step={0.5}
              value={sliderValue}
              track="normal"
              valueLabelDisplay={"on"}
              onChange={(e, newValue: number | number[]) => {
                setSliderValue(newValue as number[]);
              }}
            />
          </div>
        </CustomInputField>
        <CustomInputField
          label={""}
          placeholder={"개봉연도"}
          value={
            (yearRange[0] !== undefined || yearRange[1] !== undefined) && yearRange.join(" - ")
          }
        >
          <div css={styled.yearRangeWrapper}>
            <div css={styled.yearRangeGroups}>
              <HWTextField
                value={yearRange[0] || undefined}
                width={"122px"}
                maxLength={4}
                type={"text"}
                onChange={(e) => {
                  console.log(e.target.value);
                  return setYearRange([Number(e.target.value) || undefined, yearRange[1]]);
                }}
              />
              <div>-</div>
              <HWTextField
                value={yearRange[1] || undefined}
                width={"122px"}
                maxLength={4}
                type={"text"}
                onChange={(e) => {
                  console.log(e.target.value);
                  return setYearRange([yearRange[0], Number(e.target.value) || undefined]);
                }}
              />
            </div>
            <div css={styled.currentYear}>
              <HWCheckBox
                checked={
                  yearRange[0] === new Date().getFullYear() &&
                  yearRange[1] === new Date().getFullYear()
                }
                icon={<IconCheckboxOff />}
                checkedIcon={<IconCheckboxOn />}
                onChange={(checked) => {
                  if (checked) setYearRange([new Date().getFullYear(), new Date().getFullYear()]);
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

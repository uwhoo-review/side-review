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

const FilterGroups = () => {
  const [value, setValue] = useState<string[]>([]);
  const handleChange = (e: SelectChangeEvent<string[]>) => {
    const { value } = e.target;
    setValue(typeof value === "string" ? value.split(",") : [...value]);
  };
  const [sliderValue, setSliderValue] = useState<number[]>([0, 5]);
  const [yearRange, setYearRange] = useState<(number | undefined)[]>([undefined, undefined]);
  const min = 0;
  const max = 5;

  return (
    <div css={styled.wrapper}>
      <div css={styled.filterGroups}>
        <HWOutlinedSelectBox
          label={"필터"}
          multiple
          placeholder={"장르"}
          value={value}
          onChange={handleChange}
          renderValue={(values: any) => (
            <div css={styled.multiBox}>
              {values.map((v: any) => (
                <HWChip key={v} label={v} css={styled.chip} />
              ))}
            </div>
          )}
        >
          {[...Array(7)].map((_, idx) => (
            <HWOutlinedSelectBox.Item key={idx} value={`value${idx}`}>
              {`value${idx}`}
            </HWOutlinedSelectBox.Item>
          ))}
        </HWOutlinedSelectBox>
        <HWOutlinedSelectBox
          label={""}
          multiple
          placeholder={"플랫폼"}
          value={value}
          onChange={handleChange}
          renderValue={(values: any) => (
            <div css={styled.multiBox}>
              {values.map((v: any) => (
                <HWChip key={v} label={v} css={styled.chip} />
              ))}
            </div>
          )}
        >
          {[...Array(7)].map((_, idx) => (
            <HWOutlinedSelectBox.Item key={idx} value={`value${idx}`}>
              {`value${idx}`}
            </HWOutlinedSelectBox.Item>
          ))}
        </HWOutlinedSelectBox>
        <HWOutlinedSelectBox
          label={""}
          placeholder={"시청등급"}
          value={value}
          onChange={handleChange}
        >
          {[...Array(7)].map((_, idx) => (
            <HWOutlinedSelectBox.Item key={idx} value={`value${idx}`}>
              {`value${idx}`}
            </HWOutlinedSelectBox.Item>
          ))}
        </HWOutlinedSelectBox>
        <CustomInputField
          label={""}
          placeholder={"평"}
          value={sliderValue}
          onChange={handleChange}
        >
          <div css={styled.sliderWrapper}>
            <HWSlider
              min={min}
              max={max}
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
        <CustomInputField label={""} placeholder={"개봉연도"} value={yearRange} >
          <div css={styled.yearRangeWrapper}>
            <div css={styled.yearRangeGroups}>
              <HWTextField value={yearRange[0]} width={"122px"} />
              <div>-</div>
              <HWTextField value={yearRange[1]} width={"122px"} />
            </div>
            <div css={styled.currentYear}>
              <HWCheckBox
                checked={false}
                icon={<IconCheckboxOff />}
                checkedIcon={<IconCheckboxOn />}
                label={<HWTypography variant={"bodyXS"}>올해로 설정</HWTypography>}
              />
            </div>
          </div>
        </CustomInputField>

        <HWOutlinedSelectBox
          label={"인기순"}
          placeholder={"정렬"}
          value={value}
          onChange={handleChange}
        >
          {[...Array(7)].map((_, idx) => (
            <HWOutlinedSelectBox.Item key={idx} value={`value${idx}`}>
              {`value${idx}`}
            </HWOutlinedSelectBox.Item>
          ))}
        </HWOutlinedSelectBox>
      </div>
    </div>
  );
};

export default FilterGroups;

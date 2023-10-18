import { useState } from "react";
import styled from "./style";
import HWOutlinedSelectBox from "@src/component/atoms/HWOutlinedSelectBox";
import { SelectChangeEvent } from "@mui/material";
import HWChip from "@src/component/atoms/HWChip/HWChip";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";

const FilterGroups = () => {
  const [value, setValue] = useState<string[]>([]);
  const handleChange = (e: SelectChangeEvent<string[]>) => {
    const { value } = e.target;
    setValue(typeof value === "string" ? value.split(",") : [...value]);
  };
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
        <HWOutlinedSelectBox
          label={""}
          placeholder={"Option"}
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
          placeholder={"Option"}
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
          label={"인기순"}
          placeholder={"정렬"}
          value={value}
          onChange={handleChange}
          // renderValue={(values: any) => (
          //   <div css={styled.multiBox}>
          //     {values.map((v: any) => (
          //       <HWChip key={v} label={v} css={styled.chip} />
          //     ))}
          //   </div>
          // )}
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

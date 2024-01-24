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
  FILTER_SORT_ID, FILTER_SORT_ID_NAME,
  GENRE_ID, GENRE_ID_NAME,
  GENRE_NAME,
  PLATFORM_ID, PLATFORM_ID_NAME,
  PLATFORM_NAME
} from "@src/variables/CommonConstants";
import { useCommon } from "@src/providers/CommonProvider";

const FilterGroups = () => {
  const { filterState, filterRef, onHandleFilter, onHandleFilterOpen } = useCommon();

  /*  const [genre, setGenre] = useState<any[]>([]);
  const [platform, setPlatform] = useState<any[]>([]);
  const [watch, setWatch] = useState<string[]>([]);
  const [rating, setRating] = useState<number[]>([0, 5]);
  const [date, setDate] = useState<(number | null)[]>([null, null]);
  const [sort, setSort] = useState<string>("");*/

  /*  useEffect(() => {
    onHandleFilter({
      genre,
      platform,
      watch,
      rating,
      date,
      sort,
    });
  }, [genre, platform, watch, rating, date, sort]);*/

  return (
    <div css={styled.wrapper}>

    </div>
  );
};

export default FilterGroups;

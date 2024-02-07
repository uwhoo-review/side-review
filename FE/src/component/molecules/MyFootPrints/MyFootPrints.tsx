import HWToggleButtonGroup from "@src/component/atoms/HWToggleButtonGroup/HWToggleButtonGroup";
import HWToggleButton from "@src/component/atoms/HWToggleButton/HWToggleButton";
import { useState } from "react";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";

const MyFootPrints = ({ toggle = "content" }: any) => {
  const [toggle1, setToggle1] = useState<string>(toggle);

  const props1 = (value: string) => {
    return {
      checked: toggle1 === value,
      onClick: () => {
        setToggle1(value);
      },
    };
  };

  return (
    <div>
      <HWTypography variant={"headlineM"} family={"Pretendard-SemiBold"}>UWHOO 발자취</HWTypography>
      <HWToggleButtonGroup>
        <HWToggleButton {...props1("content")}>내 별점 작품</HWToggleButton>
        <HWToggleButton {...props1("review")}>내 리뷰</HWToggleButton>
      </HWToggleButtonGroup>
      <div></div>
    </div>
  );
};

export default MyFootPrints;

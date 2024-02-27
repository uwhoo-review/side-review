import styled from "./style";
import Color from "@src/common/styles/Color";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import React, {Ref} from "react";

const DefaultImage = React.forwardRef(
  (
    {
      className,
      src = "",
      alt = "",
      width = "100%",
      height = "100%",
      customCss,
      onClick,
      ...props
    }: any,
    ref: Ref<HTMLDivElement | HTMLImageElement>
  ) => {
    return (
      <>
        {src === "" ? (
          <div css={[styled.emptyWrapper(width, height), customCss]} ref={ref}>
            <HWTypography
              variant={"bodyXS"}
              family={"Pretendard-SemiBold"}
              color={Color.dark.grey500}
            >
              이미지를 준비중입니다.
            </HWTypography>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            className={`default-card-wrapper ${className ? className : ""}`}
            css={[styled.wrapper(width, height), customCss]}
            onClick={onClick}
            ref={ref}
            {...props}
          />
        )}
      </>
    );
  }
);

export default DefaultImage;

import styled from "./style";
import Color from "@src/common/styles/Color";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";

const DefaultImage = ({
  className,
  src = "",
  alt = "",
  width = "100%",
  height = "100%",
  customCss,
  onClick,
  ...props
}: any) => {
  return (
    <>
      {src === "" ? (
        <div css={styled.emptyWrapper(width, height)}>
          <HWTypography variant={"bodyL"} family={"Pretendard-SemiBold"} color={Color.dark.grey500}>
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
          {...props}
        />
      )}
    </>
  );
};

export default DefaultImage;

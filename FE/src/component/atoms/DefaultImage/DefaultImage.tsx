import styled from "./style";

const DefaultImage = ({
  className,
  src = "",
  alt = "",
  width = "216px",
  height = "324px",
  customCss,
  onClick,
  ...props
}: any) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`default-card-wrapper ${className ? className : ""}`}
      css={[styled.wrapper(width, height), customCss]}
      onClick={onClick}
      {...props}
    />
  );
};

export default DefaultImage;

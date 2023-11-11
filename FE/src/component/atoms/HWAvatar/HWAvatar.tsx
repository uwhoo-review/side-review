import styled from "./style";

const HWAvatar = ({ size = "24px", children, customCss }: any) => {
  return (
    <div className={"HWAvatar-wrapper"} css={[styled.wrapper(size), customCss]}>
      {children}
    </div>
  );
};

export default HWAvatar;

import styled from "./style";
import { IconCheck, IconCheckCircle, IconToggleCircle } from "@res/index";

const HWAvatar = ({
  className,
  size = "24px",
  children,
  active = false,
  customCss,
  ...props
}: any) => {
  let classNames = [];
  classNames.push(
    "HWAvatar-wrapper",
    active ? `active` : "in-active",
    className ? `${className}` : null
  );
  classNames = classNames.filter(Boolean);
  return (
    <div css={styled.wrapper}>
      <div css={styled.toggle(size)}>
        <IconToggleCircle />
      </div>
      <IconCheckCircle css={styled.check} />
      <div
        className={classNames.join(" ")}
        css={[styled.avatarWrapper(size), customCss]}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

export default HWAvatar;

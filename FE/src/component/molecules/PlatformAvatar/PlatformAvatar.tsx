import styled from "./style";
import HWAvatar from "@src/component/atoms/HWAvatar/HWAvatar";
import { IconApple, IconDisney, IconNetflix, IconWatcha, IconWavve } from "@res/index";
import HWAvatarGroup from "@src/component/atoms/HWAvatarGroup/HWAvatarGroup";
import { PLATFORM_ID_NAME, PLATFORM_NAME } from "@src/variables/CommonConstants";

interface PlatformAvatarProps {
  list: number[];
  max?: number;
  size?: string;
  direction?: string;
}

const getAvatar = (v: number) => {
  return (
    <>
      {PLATFORM_ID_NAME[+v] === PLATFORM_NAME.NETFLIX && <IconNetflix />}
      {PLATFORM_ID_NAME[+v] === PLATFORM_NAME.DISNEY_PLUS && <IconDisney />}
      {PLATFORM_ID_NAME[+v] === PLATFORM_NAME.APPLE_TV && <IconApple />}
      {PLATFORM_ID_NAME[+v] === PLATFORM_NAME.WAVVE && <IconWavve />}
      {PLATFORM_ID_NAME[+v] === PLATFORM_NAME.WATCHA && <IconWatcha />}
    </>
  );
};

const PlatformAvatar = ({ list, size, max, direction }: PlatformAvatarProps) => {
  return (
    <div css={styled.wrapper}>
      <HWAvatarGroup size={size} max={max} direction={direction}>
        {list.map((v) => {
          return <HWAvatar key={v} size={size}>{getAvatar(v)}</HWAvatar>;
        })}
      </HWAvatarGroup>
    </div>
  );
};

export default PlatformAvatar;

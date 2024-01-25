import {PLATFORM_ID, PLATFORM_NAME} from "@src/variables/CommonConstants";
import { IconApple, IconDisney, IconNetflix, IconWatcha, IconWavve } from "@res/index";

export const PlatformConstants = {
  [PLATFORM_NAME.NETFLIX]: {
    id: PLATFORM_ID.NETFLIX,
    name: PLATFORM_NAME.NETFLIX,
    icon: IconNetflix,
  },
  [PLATFORM_NAME.WATCHA]: {
    id: PLATFORM_ID.WATCHA,
    name: PLATFORM_NAME.WATCHA,
    icon: IconWatcha,
  },
  [PLATFORM_NAME.DISNEY_PLUS]: {
    id: PLATFORM_ID.DISNEY_PLUS,
    name: PLATFORM_NAME.DISNEY_PLUS,
    icon: IconDisney,
  },
  [PLATFORM_NAME.WAVVE]: {
    id: PLATFORM_ID.WAVVE,
    name: PLATFORM_NAME.WAVVE,
    icon: IconWavve,
  },
  [PLATFORM_NAME.APPLE_TV]: {
    id: PLATFORM_ID.APPLE_TV,
    name: PLATFORM_NAME.APPLE_TV,
    icon: IconApple,
  },
}

import { css } from "@emotion/react";
import Color from "@src/common/styles/Color";

export const root = (width: string, height: string) => css`
  min-width: 106px;
  width: ${width ? width : "fit-content"};
  height: ${height};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 6px;
  flex-shrink: 0;
  z-index: 0;
  background-color: ${Color.dark.elevation01};
  border: 1px solid ${Color.dark.grey100};
  color: ${Color.dark.grey500};
  margin: 3px;

  :hover {
    color: ${Color.dark.grey700};
  }
  /* Common/ButtonMedium */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;

  &.HW_Disabled {
    color: #d6d6d6;
    pointer-events: none;
    :hover {
      color: #d6d6d6;
    }
  }

  &.HW_Checked {
    background-color: ${Color.dark.grey300};
    color: ${Color.dark.baseWhite};
    z-index: 1;
  }
  &.HW_DisableOutlined {
    border: 1px solid #d6d6d6;
  }
`;

import { css } from "@emotion/react";

export const root = (width: string, height: string) => css`
  min-width: 36px;
  width: ${width ? width : "fit-content"};
  height: ${height};
  border: 1px solid #d6d6d6;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 6px;
  flex-shrink: 0;
  z-index: 0;
  color: #7d7e85;
  background-color: #ffffff;
  :hover {
    color: #3e3e3e;
  }
  /* Common/ButtonMedium */
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;

  &.HW_Disabled {
    color: #d6d6d6;
    pointer-events: none;
    :hover {
      color: #d6d6d6;
    }
  }

  &.HW_Checked {
    border: 1px solid #2e7af2;
    background-color: #eff4fc;
    color: #2e7af2;
    :hover {
      color: #2e7af2;
    }
    z-index: 1;
  }
  &.HW_DisableOutlined {
    border: 1px solid #d6d6d6;
  }
`;

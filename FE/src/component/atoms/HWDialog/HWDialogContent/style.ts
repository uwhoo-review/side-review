import { css } from "@emotion/react";

export const root = css`
  overflow: unset;
  /* body2 */
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.17px;
  color: #3e3e3e;

  ::-webkit-scrollbar {
    width: 14px;
    border-radius: 0px 4px 3px 0px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #7d7e85;
    border-radius: 10px;
    min-height: 30px;
    background-clip: padding-box;
    border: 4px solid transparent;
  }

  &.MuiDialogContent-root {
    padding: 0;
  }
`;

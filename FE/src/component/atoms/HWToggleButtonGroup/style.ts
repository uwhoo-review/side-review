import { css } from "@emotion/react";
import Color from "@src/common/styles/Color";

export const root = css`
  //min-width: 106px;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;
  border-radius: 8px;

  background-color: ${Color.dark.elevation01};
  border: 1px solid ${Color.dark.grey100};
  color: #7d7e85;
  :hover {
    color: #3e3e3e;
  }
/*  .MuiButtonBase-root {
    border-radius: unset;
  }
  .MuiButtonBase-root:first-of-type {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  .MuiButtonBase-root:last-of-type {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .MuiButtonBase-root:not(:first-of-type) {
    margin-left: -1px;
  }*/
`;

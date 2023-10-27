import { css } from "@emotion/react";

export const root = css`
  min-width: 36px;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  color: #7d7e85;
  :hover {
    color: #3e3e3e;
  }
  .MuiButtonBase-root {
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
  }
`;

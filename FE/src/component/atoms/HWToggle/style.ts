import { css } from "@emotion/react";

export const root = css`
  .MuiSwitch-root {
  }

  .MuiSwitch-switchBase {
    &.Mui-checked .MuiSwitch-thumb {
      background-color: #2e7af2;
    }
    .MuiSwitch-thumb {
      background-color: #fafafa;
    }
    &.Mui-checked ~ .MuiSwitch-track {
      background-color: #2e7af2;
    }
    ~ .MuiSwitch-track {
      background-color: #7d7e85;
    }
  }
  .MuiSwitch-switchBase.Mui-disabled {
    &.Mui-checked .MuiSwitch-thumb {
      background-color: #a5c4f7;
    }
    .MuiSwitch-thumb {
      background-color: #fafafa;
    }
    /* &.Mui-checked ~ .MuiSwitch-track {
      background-color: #d6d6d6;
      opacity: unset;
    }
    ~ .MuiSwitch-track {
      background-color: #d6d6d6;
      opacity: unset;
    } */
  }
`;

export const form = css`
  width: fit-content;
`;

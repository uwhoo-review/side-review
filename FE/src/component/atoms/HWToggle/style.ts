import { css } from "@emotion/react";

export const root = css`
  height: 24px;
  width: 44px;
  padding: 0;
  .MuiSwitch-track {
    border-radius: 14px;
    background-color: #84838d;
    opacity: 1;
  }
  .MuiSwitch-thumb {
    background-color: #fff;
    width: 20px;
    height: 20px;
  }

  .MuiSwitch-switchBase {
    padding: 2px;

    .MuiSwitch-input {
      left: 0;
      width: 100%;
    }

    &.Mui-checked {
      & + .MuiSwitch-track {
        background-color: #6d6ada;
        opacity: 1;
      }
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
  margin: 0;
  gap: 10px;
  .MuiSwitch-root {
    .Mui-disabled {
      color: #84838d;
      opacity: 0.4;
      .MuiSwitch-thumb {
        background-color: #fff;
      }
      .MuiSwitch-track {
        background-color: #84838d;
      }
    }
  }
  .MuiTypography-root {
    span{
      color: #F9F9FD;
    }
  }
  .MuiTypography-root.Mui-disabled {
    opacity: 1;
      span {
        color: #84838D;
      }
    }
  }
`;

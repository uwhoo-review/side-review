import { css } from "@emotion/react";

export const root = css`
  font-family: Noto Sans KR;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  background-color: #ffffff;
  padding: 4px 5px;

  height: 36px;

  .menu-box {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0px 7px;
    color: #000;
  }
  &.Mui-selected {
    background-color: #ffffff;
    .menu-box {
      background-color: #dfecff;
    }

    &:hover {
      background-color: #ffffff;
      .menu-box {
        background-color: #dfecff;
      }
    }
  }
  &.Mui-disabled {
    color: #d6d6d6;
  }
  &:hover {
    background-color: #ffffff;
    .menu-box {
      background-color: #ffffff;
    }
  }
`;

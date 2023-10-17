import { css } from "@emotion/react";
import Color from "@src/common/styles/Color";

export const root = css`
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  padding: 0;
  height: 40px;
  .menu-box {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0px 10px;
    border-radius: 4px;
    color: #fff;
    justify-content: space-between;
    .icon-check{
      color: #B6B2EA;
    }
  }
  &:hover {
    .menu-box {
      background-color: #b6b2ea26;
    }
  }

  &.Mui-selected {
    .menu-box {
      background-color: #b6b2ea26;
    }

    &:hover {
      .menu-box {
        background-color: #b6b2ea26;
      }
    }
  }

  &.Mui-disabled {
    color: #d6d6d6;
  }
`;

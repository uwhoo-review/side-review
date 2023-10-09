import { css } from "@emotion/react";

export default {
  wrapper: css``,
  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  avatarGroup: css`
    div {
      border: none !important;
      width: 28px;
      height: 28px;
      font-size: 12px;
    }
  `,
  avatar: css`
    background-color: transparent;
    border: none !important;
    width: 28px;
    height: 28px;
  `,
};

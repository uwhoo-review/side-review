import { css } from "@emotion/react";

export default {
  wrapper: css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 16px;
    width: 102px;
  `,
  textGroup: css`
    //width: 120px;
    height: 44px;
    display: flex;
    flex-direction: column;

/*    overflow: hidden;
    span {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }*/
  `,
  imageWrapper: css`
    width: 82px;
    height: 82px;
    border-radius: 20px;
    flex-shrink: 0;
  `,
};

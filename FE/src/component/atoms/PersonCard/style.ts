import { css } from "@emotion/react";

export default {
  wrapper: css`
    display: inline-flex;
    align-items: center;
    gap: 16px;
    width: 216px;
  `,
  textGroup: css`
    //width: 120px;
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

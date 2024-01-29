import { css } from "@emotion/react";

export default {
  accordion: css`
    margin-bottom: 70px;
    &.Mui-expanded {
      margin-bottom: 70px;
    }  `,
  wrapper: css``,
  title: css`
    display: flex;
    flex-direction: column;
  `,
  subWrapper: css`
    margin-top: 30px;
  `,
  contentBox: css`
    width: 100%;
    //height: 380px;
    background-color: #1e1e1e;
    border-radius: 10px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
  `,
  leftBox: css`
    width: 230px;
    flex: 0 0 230px;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 16px;
  `,
  rightBox: css`
    width: calc(100% - 230px);
    //width: 1276px;
    flex: 1 0;
    //overflow: hidden;
  `,
  typo1: css`
    color: #6d6ada;
  `,
};

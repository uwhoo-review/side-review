import { css } from "@emotion/react";

export default {
  accordion: css`
    margin-bottom: 70px;
    &.Mui-expanded {
      margin-bottom: 70px;
    }
  `,
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
  modalWrapper: css`
    .MuiDialog-paper {
      border-radius: 10px;

      background-color: #252525;
    }
  `,
  modalContentBox: css`
    display: flex;
    flex-direction: column;
  `,
  box1: css`
    margin-top: 20px;
  `,
  box2: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  `,
  box3: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
    margin-top: 8px;
  `,
  loadingBox: css`
    min-height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  footer: css`
    display: flex;
    justify-content: center;
    align-items: center;


      gap: 42px;
      margin-top: 20px;
  `,
  emptyBox: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;

    background-color: #1e1e1e;
    height: 226px;
    border-radius: 8px;
    margin-top: 8px;
  `,
  iconBtn: css`
    height: 34px;
    width: 24px;
    background-color: #00000080;
  `,
  arrowBtn: css`
    width: 24px;
    height: 34px;
    border-radius: 8px;
    background-color: #00000099;
    padding: 0;
    color: #ffffff;
    &:hover {
      background-color: #000000cc;
    }
  `,
};

import { css } from "@emotion/react";
import Color from "@src/common/styles/Color";

export default {
  wrapper: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  `,
  typo1: css`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-bottom: 30px;
  `,
  typo2: css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
  `,
  typo3: css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    color: #b6b2ea;
    cursor: pointer;
  `,
  modal: css`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    color: #fff;
    .MuiBackdrop-root {
      background-color: rgba(0, 0, 0, 0.2);
    }
  `,
  modalWrapper: css`
    width: 100%;
    height: calc(100% - 300px);
    background-color: #121212;
    padding-top: 70px;
    overflow: auto;
    border-radius: 15px;
  `,
};

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
  modal: (size: number) => css`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: ${size}px;
    background-color: #232323;
    border: 1px solid #333333;
    z-index: 15;
    //display: flex;
    //justify-content: center;
    //align-items: flex-end;
    //color: #fff;
    user-select: none;
    //.MuiBackdrop-root {
    //  background-color: rgba(0, 0, 0, 0.2);
    //}
  `,
  modalWrapper: css`
    width: 100%;
    height: 100%;

    overflow: auto;
    border-radius: 15px;
  `,
  heightHandler: css`
    --width: 140px;
    width: var(--width);

    position: absolute;
    top: 16px;
    left: calc(50% - (var(--width) / 2));

    height: 8px;
    border-radius: 10px;
    background-color: yellow;

    cursor: pointer;
  `,
};

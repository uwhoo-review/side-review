import { css } from "@emotion/react";
import Color from "@src/common/styles/Color";

export default {
  wrapper: css`
    margin-top: 50px;
  `,
  subWrapper: css`
    
  `,
  subTitle: css`
    margin-bottom: 20px;
  `,
  toggle: css`
    margin-bottom: 49px;
  `,
  sub1: css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    
    margin-bottom: 40px;
  `,
  sub2: css`
    background-color: ${Color.dark.elevation01};
    border-radius: 10px;
    padding: 60px 50px;
    box-sizing: border-box;
    
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    min-height: 380px;

    margin-bottom: 40px;
  `,
  plusBtn: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  `
}

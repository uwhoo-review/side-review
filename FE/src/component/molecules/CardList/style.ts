import { css } from "@emotion/react";

export default {
  wrapper: css`
    //margin-top: 70px;
  `,
  title: css`
    font-family: Pretendard, sans-serif;
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: 40px;
    margin-bottom: 20px;
  `,
  subTitle: css`
    font-family: Pretendard, sans-serif;
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    line-height: 30px;
    margin-bottom: 40px;
  `,
  cardSlider: css`
    width: 1440px;
    position: relative;
    overflow: hidden;
  `,
  cardWrapper: (currentPage: number) => css`
    display: flex;
    align-items: center;
    gap: 20px;

    transition: 0.5s;
    transform: translate(-${currentPage * 236}px, 0px);
  `,
  leftPageBtn: css`
    position: absolute;
    top: calc(50% - 30px);
    left: 30px;

    background-color: #3e3e3e80;
    color: #ffffff;
    z-index: 1;
    //display: none;
  `,
  rightPageBtn: css`
    position: absolute;
    top: calc(50% - 30px);
    right: 30px;

    background-color: #3e3e3e80;
    color: #ffffff;
    z-index: 1;
    //display: none;
  `,
};

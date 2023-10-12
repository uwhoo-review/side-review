import { css } from "@emotion/react";

export default {
  wrapper: css`
    margin-top: 70px;
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
    //margin-bottom: 40px;
    width: 100%;
  `,
  cardSlider: css`
    width: 1396px;
    position: relative;
    overflow: hidden;
  `,
  cardWrapper: (currentPage: number) => css`
    display: flex;
    align-items: center;
    gap: 20px;

    transition: 0.5s ease;
    transform: translate(${(currentPage - 1) * -(1396 + 20)}px, 0px);
    //transform: translate(${(currentPage - 1) * -100}%, 0px);
  `,
  leftPageBtn: css`
    position: absolute;
    top: calc(50% - 30px);
    left: 30px;

    background-color: #3e3e3e80;
    color: #ffffff;
    z-index: 1;
  `,
  rightPageBtn: css`
    position: absolute;
    top: calc(50% - 30px);
    right: 30px;

    background-color: #3e3e3e80;
    color: #ffffff;
    z-index: 1;
  `,
  previewBox: css`
    @keyframes previewSlide {
      from {
        transform: scaleX(0);
      }
      to {
        transform: scaleX(1);
      }
    }
    height: 670px;
    width: 100%;
    background-color: #121212;
    margin-top: 43px;
    //transition: all 0.4s;
    animation: previewSlide 0.8s ease;
    /*display: none;
    opacity: 0;
    overflow: hidden;
    &.open{
      display: block;
      opacity: 1;
      transition: all 0.4s;
    }*/
    
    
  `,
  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  dotPagination: css`
    //float: right;
  `,
};

import { css } from "@emotion/react";

export default {
  wrapper: css`
    margin-bottom: 100px;
  `,
  title: css`
    font-family: Pretendard, sans-serif;
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: 40px;
  `,
  subTitle: css`
    font-family: Pretendard, sans-serif;
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    line-height: 30px;
    margin-bottom: 20px;
    width: 100%;
    margin-top: 20px;
    display: flex;
    align-items: center;
    color: #d9dae5;
  `,
  cardSlider: (currentPage: number, lastPage: number) => css`
    width: 1396px;
    position: relative;
    overflow: hidden;

    &:hover {
      .hover-arrow {
        z-index: 1;
        &.left {
          display: ${currentPage === 1 ? "none" : "flex"};
        }
        &.right {
          display: ${currentPage === lastPage ? "none" : "flex"};
        }
      }
    }
    &:not(:hover) {
      .hover-arrow {
        z-index: 0;
        display: none;
      }
    }
  `,
  cardWrapper: (translateX: any, active: boolean) => css`
    display: flex;
    align-items: flex-end;
    width: 100%;
    min-height: 382px;
    transition: 0.5s ease transform;
    transform: translateX(${translateX}px);
    gap: ${active ? "40px" : "20px"};
    .content-slide {
      margin-top: 20px;
    }
  `,
  card: css`
    cursor: pointer;
  `,

  leftPageBtn: css`
    position: absolute;
    top: calc(50% - 30px);
    left: 30px;

    //z-index: 0;
    //display: none;
  `,
  rightPageBtn: css`
    position: absolute;
    top: calc(50% - 30px);
    right: 30px;

    //background-color: #3e3e3e80;
    //color: #ffffff;
    //z-index: 0;
    //display: none;
  `,
  previewBox: css`
    /* @keyframes heightSlide {
      from {
        height: 0px;
      }
      to {
        height: 670px;
      }
    }
    height: 670px;
    width: 100%;
    background-color: #121212;
    margin-top: 43px;
    animation: heightSlide 0.8s ease;
*/
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

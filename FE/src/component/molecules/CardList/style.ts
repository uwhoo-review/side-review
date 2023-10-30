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
  `,
  subTitle: css`
    font-family: Pretendard, sans-serif;
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    line-height: 30px;
    margin-bottom: 40px;
    width: 100%;
    margin-top: 20px;
  `,
  cardSlider: css`
    width: 1396px;
    position: relative;
    overflow: hidden;

    :hover {
      .hover-arrow {
        z-index: 1;
        display: flex;
        visibility: visible;
      }
    }
  `,
  cardWrapper: (currentPage: number, inActive: boolean) => css`
    display: flex;
    align-items: center;
    width: 100%;
    gap: ${inActive ? "40px" : "20px"};

    transition: 0.5s ease transform;
    transform: translate(${(currentPage - 1) * -(1396 + 20)}px, 0px);
  `,
  card: css`
    cursor: pointer;
  `,
  leftPageBtn: css`
    position: absolute;
    top: calc(50% - 30px);
    left: 30px;

    //background-color: #3e3e3e80;
    //color: #ffffff;
    z-index: 0;
    display: none;
  `,
  rightPageBtn: css`
    position: absolute;
    top: calc(50% - 30px);
    right: 30px;

    background-color: #3e3e3e80;
    color: #ffffff;
    z-index: 0;
    display: none;

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

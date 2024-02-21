import { css } from "@emotion/react";

export default {
  wrapper: css``,
  cardSlider: (currentPage: number, lastPage: number) => css`
    width: 100%;
    position: relative;
    overflow: hidden;
    color: #fff;

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
    align-items: center;
    width: 100%;
    min-height: 186px;
    transition: 0.5s ease transform;
    transform: translateX(${translateX}px);
    gap: 30px;
    .content-slide {
      position: relative;
      &:hover {
        .content-close-button {
          display: inline-flex;
        }
      }
    }
  `,
  card: css`
    cursor: pointer;
    opacity: 1;
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

  closeButton: css`
    position: absolute;
    right: -5px;
    top: -10px;
    color: #fff;
    padding: 3px;
    background-color: #000;
    display: none;
    z-index: 2;
    &:hover {
      background-color: #fff;
    }
  `,
};

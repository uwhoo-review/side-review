import { css } from "@emotion/react";

export default {
  wrapper: css`
    width: 100%;
    height: 100%;
    padding-top: 70px;
    box-sizing: border-box;
  `,
  centerWrapper: css`
    height: 100%;
  `,
  header: css``,
  headline: css`
    font-family: Pretendard-SemiBold;
  `,
  subHeadline: css`
    font-family: Pretendard;
  `,
  contentWrapper: css`
    display: flex;
    justify-content: flex-end;
    //margin-top: 40px;
    height: calc(100% - 70px);
    //box-sizing: border-box;
  `,
  leftBox: css`
    flex-basis: 452px;
    margin-right: 20px;
    //width: 452px;
  `,
  rightBox: css`
    flex-basis: 900px;
    flex-grow: 1;

    height: 100%;
    & > div {
      width: 100%;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    //width: 100%;
    //transition: 1s ease;
  `,
  cardWrapper: (active: boolean) => css`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    flex-wrap: wrap;
    column-gap: ${active ? "40px" : "20px"};
    row-gap: 40px;

    transition: 1s ease transform;
  `,
  card: css`
    cursor: pointer;
  `,
  floatWrapper: css`
    position: sticky;
    top: 90px;
    width: 100%;
    height: 792px;
    background-color: #121212;

    border-radius: 10px;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.5);
    @keyframes translateXSlide {
      from {
        transform: translateX(-150%);
      }
      to {
        transform: translateX(0%);
      }
    }
    animation: translateXSlide 1s ease;
    /*    
    visibility: hidden;
    opacity: 0;

    transition: 1s ease;
    &.open {
      visibility: visible;
      opacity: 1;
    }*/
  `,
};

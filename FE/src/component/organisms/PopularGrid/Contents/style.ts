import { css } from "@emotion/react";

export default {
  wrapper: css``,
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
    //align-items: stretch;
    margin-top: 40px;
  `,
  leftBox: css`
    flex-basis: 452px;
    margin-right: 20px;
    //width: 452px;
  `,
  rightBox: css`
    flex-basis: 900px;
    flex-grow: 1;
    //width: 100%;
    //transition: 1s ease;

  `,
  cardWrapper: css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;

    transition: 1s ease;
    &.open {
      gap: 20px;
    }
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

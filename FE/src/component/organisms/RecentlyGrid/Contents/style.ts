import { css } from "@emotion/react";
import Color from "@src/common/styles/Color";

export default {
  wrapper: css`
    width: 100%;
    padding-top: 70px;
    box-sizing: border-box;
  `,
  centerWrapper: css``,
  header: css``,
  headline: css`
    font-family: Pretendard-SemiBold;
    margin-bottom: 20px;
  `,
  subHeadline: css`
    font-family: Pretendard;
    margin-bottom: 40px;
  `,
  contentWrapper: css`
    display: flex;
    //justify-content: flex-end;
    //margin-top: 40px;
    //box-sizing: border-box;
  `,
  leftBox: css`
    width: 452px;
    margin-right: 20px;
  `,
  rightBox: css`
    flex-grow: 1;
    width: 100%;
    padding-bottom: 100px;
    & > div {
      //width: 100%;
      &::-webkit-scrollbar {
        //display: none;
      }
    }
  `,
  cardWrapper: (active: boolean) => css`
    /*    display: flex;
    
    justify-content: flex-end;
    flex-wrap: wrap;
    column-gap: ${active ? "40px" : "20px"};
    row-gap: 40px;

    transition: 1s ease transform;*/
  `,
  listContainer: (active: boolean) => css`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    transition: 1s ease transform;

    // column-gap: ${active ? "40px" : "20px"};
    
  `,
  itemContainer: (active: boolean) => css`
    display: flex;
    flex: none;
    align-content: stretch;
    align-items: flex-end;
    box-sizing: border-box;
    margin-bottom: 40px;
    width: ${active ? `calc(100% / 4)` : `calc(100% / 6)`};
    //height: 380px;
  `,
  item: css`
    flex: 1;
    white-space: nowrap;
    display: flex;
    justify-content: center;
  `,
  card: css`
    cursor: pointer;
  `,
  cardBox: css`
    display: inline-block;
  `,
  floatWrapper: css`
    position: sticky;
    top: 90px;
    width: 100%;
    height: 711px;

    padding: 20px;
    box-sizing: border-box;

    border-radius: 10px;
    background-color: ${Color.dark.elevation02};
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

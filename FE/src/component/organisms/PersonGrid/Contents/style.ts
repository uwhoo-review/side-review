import { css } from "@emotion/react";
import Color from "@src/common/styles/Color";

export default {
  wrapper: css`
    margin-top: 50px;
    padding-bottom: 100px;

  `,
  subWrapper: css``,
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
    padding: 50px 118px;
    box-sizing: border-box;

    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    column-gap: 20px;
    row-gap: 50px;
    min-height: 314px;
    margin-bottom: 40px;
  `,
  plusBtn: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-bottom: 40px;
  `,
  listContainer: css`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    transition: 1s ease transform;
  `,
  itemContainer: css`
    display: flex;
    flex: none;
    align-content: stretch;
    align-items: flex-end;
    box-sizing: border-box;
    margin-bottom: 40px;
    width: calc(100% / 6);
    height: 380px;
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
  emptyWrapper: css`
    height: 314px;
    width: 100%;
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: #1e1e1e;
    border-radius: 10px;
  `,
};

import { css } from "@emotion/react";
import Color from "@src/common/styles/Color";

export default {
  wrapper: css`
    margin-top: 20px;
    width: 100%;
  `,
  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  multiBox: css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  chip: css`
    margin-right: 8px;
  `,
  typography: css`
    display: block;
    color: ${Color.dark.grey800};
  `,
  filterGroups: css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    gap: 20px;
  `,
  sliderWrapper: css`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    height: 100px;
    width: 296px;
  `,
  yearRangeWrapper: css`
    height: 100px;
    width: 296px;
  `,
  yearRangeGroups: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  `,
  currentYear: css`
    display: flex;
    justify-content: end;
    align-items: center;
  `,
  typographyCheck: css`
    color: ${Color.dark.grey700};
    //font-size: 13px;

  `
};

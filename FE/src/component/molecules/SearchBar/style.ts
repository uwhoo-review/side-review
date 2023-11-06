import { css } from "@emotion/react";
import Color from "@src/common/styles/Color";

export default {
  wrapper: css`
    //display: flex;
    //flex-direction: column;
    //justify-content: center;
    //align-items: center;
    width: 100%;
  `,
  typography: css`
    display: block;
    color: ${Color.dark.grey800};
  `,
  searchGroups: css`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 20px;
  `,
  searchBtnGroups: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    //height: 100%;
  `,
};

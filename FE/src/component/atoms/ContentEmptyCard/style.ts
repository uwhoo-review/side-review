import { css } from "@emotion/react";
import Color from "@src/common/styles/Color";

export default {
  wrapper: (active: boolean) => css`
    position: relative;
    border-radius: 10px;
    opacity: ${active ? 1 : 0.5};
    width: fit-content;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;

  `,
  imgWrapper: (active: boolean) => css`
    width: ${active ? "216px" : "196px"};
    height: ${active ? "324px" : "294px"};

    border-radius: 10px;
    overflow: hidden;
    transition: 0.1s ease height;

    background-color: ${Color.dark.elevation02};
    margin-bottom: 10px;
  `,
  title: css`
    margin-bottom: 2px;
    position: relative;
  `,
  description: css`
    margin-top: 10px;
    height: 45px;
    background-color: ${Color.dark.elevation02};
  `,
};

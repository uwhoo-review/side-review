import { css } from "@emotion/react";
import Color from "@src/common/styles/Color";

export default {
  wrapper: (width: string, height: string, radius: string, backgroundColor: string) => css`
    width: ${width};
    height: ${height};

    border-radius: ${radius};

    background-color: ${backgroundColor};
    border: 1px solid ${Color.dark.grey300};

    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.25);

    padding: 14px;
    box-sizing: border-box;
  `,
  topWrapper: css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 24px;
    margin-bottom: 10px;
  `,

  bestDiv: css`
    width: 117px;
    height: 24px;
    border-radius: 6px;
    background-color: #03dac61f;

    color: #03dac6;

    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;

    display: flex;
    justify-content: center;
    align-items: center;

    gap: 4px;
  `,
  dateDiv: css`
    color: ${Color.dark.grey500};

    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
  `,
  contents: (line: number) => css`
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${line};
    -webkit-box-orient: vertical;

    color: ${Color.dark.grey900};
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
  `,
  footer: css`
    height: 32px;
    border-top: 1px solid ${Color.dark.grey300};

    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
};

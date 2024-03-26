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

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  modalWrapper: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  topWrapper: css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 24px;
    margin-bottom: 10px;
  `,
  topWrapper2: css``,
  chipWrapper: css`
    display: flex;
    align-items: center;
    gap: 10px;
  `,
  bestDiv: css`
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
  spoiler: css`
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
  `,
  dateDiv: css`
    color: ${Color.dark.grey500};

    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
  `,
  contents: css`
    height: 100%;
    color: ${Color.dark.grey900};
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    overflow-y: auto;
    word-break: break-all;
  `,
  lineClamp: (line?: number) => css`
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${line};
    -webkit-box-orient: vertical;
  `,
  bottomWrapper: css`
    height: 32px;
    // border-top: 1px solid ${Color.dark.grey300};

    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  flex1: css`
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 24px;
    color: ${Color.dark.grey500};
  `,
  flex2: css`
    display: flex;
    align-items: center;
    gap: 4px;
    color: ${Color.dark.grey400};
    font-family: Poppins;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
  `,
  thumb: css`
    cursor: pointer;
    &:hover {
      color: #fff;
    }
  `,
  leftPageBtn: css`
    position: absolute;
    top: calc(50% - 30px);
    left: 10px;
  `,
  rightPageBtn: css`
    position: absolute;
    top: calc(50% - 30px);
    right: 10px;
  `,
};

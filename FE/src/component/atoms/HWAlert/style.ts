import { css } from "@emotion/react";

export const root = {
  wrapper: css`
    width: 320px;
    box-sizing: border-box;
    color: #3e3e3e;
    .MuiAlert-message {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 4px;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
    }
    .MuiAlert-action {
      padding: 4px 0 0 9px;
    }
  `,
  title: css`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin: unset;
    .title {
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
    }
    .time-info {
      font-weight: 500;
      font-size: 13px;
      line-height: 22px;
    }
  `,
};

export const backgroundColor = (type: "error" | "success" | "info") => {
  if (type === "error")
    return css`
      background-color: #fdecea;
    `;
  if (type === "info")
    return css`
      background-color: #e5f3fa;
    `;
  return css`
    background-color: #eaf2ea;
  `;
};

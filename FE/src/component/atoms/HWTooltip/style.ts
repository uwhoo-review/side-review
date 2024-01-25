import { css } from "@emotion/react";
// import { CSSInterpolation } from "@emotion/serialize";

export const tooltip = (css: any, variant: string) => {
  return variant === "secondary"
    ? css`
        background-color: unset;
        padding: unset;
        color: #3e3e3e;
        /* Common/Tooltip */
        font-family: "Pretendard";
        font-style: normal;
        font-weight: 500;
        font-size: 10px;
        line-height: 14px;
      `
    : css`
        max-width: 200px;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        /* Common/Tooltip */
        color: #c7c8d3;
        background-color: #383838;
        padding: 6px 10px;

        font-family: "Pretendard";
        font-size: 13px;
        font-style: normal;
        font-weight: 500;
        line-height: 18px;
      `;
};
export const textRef = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const basicButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 22px;
  border-radius: 4px;
  background-color: #383838;
  text-transform: none;
  font-size: 10px;
  font-weight: 500;
  color: white;
  text-align: center;
`;

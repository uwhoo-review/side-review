import { css } from "@emotion/react";
import { CSSInterpolation } from "@emotion/serialize";

export const tooltip = (
  css: {
    (template: TemplateStringsArray, ...args: CSSInterpolation[]): string;
    (...args: CSSInterpolation[]): string;
  },
  variant: string
) => {
  return variant === "secondary"
    ? css`
        background-color: unset;
        padding: unset;
        color: #3e3e3e;
        /* Common/Tooltip */
        font-family: "z";
        font-style: normal;
        font-weight: 500;
        font-size: 10px;
        line-height: 14px;
      `
    : css`
        max-width: 219px;
        max-height: 41px;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-word;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        /* Common/Tooltip */
        font-family: "Pretendard";
        font-style: normal;
        font-weight: 500;
        font-size: 10px;
        line-height: 14px;
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
  background-color: #616161;
  text-transform: none;
  font-size: 10px;
  font-weight: 500;
  color: white;
  text-align: center;
`;

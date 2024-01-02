import { css } from "@emotion/react";

export default {
  wrapper: css`
    width: 390px;
    height: 60px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    gap: 12px;
    cursor: pointer;
    opacity: 0.9;
    border: 1px solid #00bf19;
    background: rgba(0, 191, 25, 0.8);
    color: #d9dae5;
    &:hover {
      opacity: 1;
      background: rgba(0, 191, 25, 1);
    }
  `,
}

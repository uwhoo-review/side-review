import { css } from "@emotion/react";

export default {
  wrapper: css`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 87px;
    position: relative;
    .login-btn {
      width: 390px;
      height: 60px;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      gap: 12px;
      opacity: 0.9;
    }
  `,
  googleBtn: css`
    border: 1px solid rgba(255, 255, 255, 0.8);
    background: rgba(217, 218, 229, 0.8);
    width: 390px;
    height: 60px;
    color: #2c2c34;
    &:hover {
      opacity: 1;
      background: rgba(217, 218, 229, 1);
    }
  `,
  naverBtn: css`
    border: 1px solid #00bf19;
    background: rgba(0, 191, 25, 0.8);
    width: 390px;
    height: 60px;
    color: #d9dae5;
    &:hover {
      opacity: 1;
      background: rgba(0, 191, 25, 1);
    }
  `,
  kakaoBtn: css`
    border: 1px solid #fddc3f;
    background: rgba(253, 220, 63, 0.8);
    width: 390px;
    height: 60px;
    color: #3a2929;
    &:hover {
      opacity: 1;
      background: rgba(253, 220, 63, 1);
    }
  `,
  btnWrapper: css`
    position: relative;
  `,
  bubble: css`
    position: absolute;
    right: calc(100% + 15px);
    top: calc(50% - 15px);
  `,
};

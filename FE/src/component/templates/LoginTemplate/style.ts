import { css } from "@emotion/react";

export default {
  wrapper: css`
    transition: 5s ease-in-out all;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
    }
  `,
  sliderWrapper: (idx: number) => css`
    transition: 5s ease-in-out all;

    div:nth-of-type(${idx+1}) {
      visibility: visible;
      opacity: 1;
    }
  `,
  bgWrapper: (bg: string) => css`
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(${bg});
    width: 100%;
    height: 100%;
    position: fixed;
    transition: all 3s ease-out;
    visibility: hidden;
    opacity: 0;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
    }
  `,
  loginWrapper: css`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    z-index: 1;
  `,
  typo1: css`
    color: #d9dae5;
    font-size: 32px;
    font-weight: 600;
    letter-spacing: 1.28px;
    margin-top: 80px;
  `,
  typo2: css`
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 28px;
    color: #9897a1;
    margin-top: 30px;
  `,
  typo3: css``,
  buttonWrapper: css`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 87px;
    div {
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
};

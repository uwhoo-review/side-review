import { css } from "@emotion/react";

export default {
  wrapper: (bg: any) => css`
    @keyframes bg-slide {
      0% {
        background-image: url(${bg[0]});
      }
      10% {
        background-image: url(${bg[1]});
      }
      20% {
        background-image: url(${bg[2]});
      }
      30% {
        background-image: url(${bg[3]});
      }
      40% {
        background-image: url(${bg[4]});
      }
      50% {
        background-image: url(${bg[5]});
      }
      60% {
        background-image: url(${bg[6]});
      }
      70% {
        background-image: url(${bg[7]});
      }
      80% {
        background-image: url(${bg[8]});
      }
      90% {
        background-image: url(${bg[9]});
      }
      100% {
        background-image: url(${bg[0]});
      }
    }
    animation: bg-slide 100s
      linear(
        0 0%,
        0 1.8%,
        0.01 3.6%,
        0.03 6.35%,
        0.07 9.1%,
        0.13 11.4%,
        0.19 13.4%,
        0.27 15%,
        0.34 16.1%,
        0.54 18.35%,
        0.66 20.6%,
        0.72 22.4%,
        0.77 24.6%,
        0.81 27.3%,
        0.85 30.4%,
        0.88 35.1%,
        0.92 40.6%,
        0.94 47.2%,
        0.96 55%,
        0.98 64%,
        0.99 74.4%,
        1 86.4%,
        1 100%
      )
      infinite;
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

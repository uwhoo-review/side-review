import { css } from "@emotion/react";
import Color from "@src/common/styles/Color";

export default {
  wrapper: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  `,
  typo1: css`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-bottom: 30px;
  `,
  typo2: css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
  `,
  typo3: css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    color: #b6b2ea;
  `,
};

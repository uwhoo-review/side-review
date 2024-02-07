import { css } from "@emotion/react";

export const root = (width?: string, height?: string) => css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  .MuiBackdrop-root {
    backdrop-filter: blur(4px);
  }

  .MuiDialog-paper {
    width: ${width};
    height: ${height};
    max-width: unset;
    background-color: transparent;
    padding: 24px;
  }
`;

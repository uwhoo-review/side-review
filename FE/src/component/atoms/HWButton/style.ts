import { css } from "@emotion/react";

export const root = (size: "large" | "medium" | "small") => {
  enum heightEnum {
    large = "42px",
    medium = "36px",
    small = "30px",
  }
  enum paddingEnum {
    large = "0 26.5px",
    medium = "0 17.5px",
    small = "0 13.5px",
  }

  return css`
    width: max-content;
    height: ${heightEnum[size]};
    padding: ${paddingEnum[size]};
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 1rem;
    }
  `;
};

export const variant = (
  variant: "primary" | "secondary" | "lower" | "lowest" | "box"
) => {
  switch (variant) {
    case "primary": {
      return css`
        background-color: #2e7af2;
        color: white;
        &:hover {
          background-color: #1a62d3;
        }
        .MuiTouchRipple-root {
          color: white;
        }
        &.Mui-disabled {
          background-color: #d6d6d6;
          color: #7d7e85;
        }
      `;
    }
    case "secondary": {
      return css`
        background-color: unset;
        color: #2e7af2;
        border: solid 1px #2e7af2;
        &:hover {
          background-color: #eff4fc;
        }
        .MuiTouchRipple-root {
          color: #1e71d2;
        }
        &.Mui-disabled {
          border: solid 1px #d6d6d6;
          color: #7d7e85;
        }
      `;
    }
    case "lower": {
      return css`
        background-color: unset;
        color: #2e7af2;
        border: solid 1px #d6d6d6;
        &:hover {
          background-color: #eff4fc;
        }
        .MuiTouchRipple-root {
          color: #1e71d2;
        }
        &.Mui-disabled {
          border: solid 1px #d6d6d6;
          color: #7d7e85;
        }
      `;
    }
    case "lowest": {
      return css`
        background-color: unset;
        color: #2e7af2;
        &:hover {
          background-color: #eff4fc;
        }
        .MuiTouchRipple-root {
          color: #1e71d2;
        }
        &.Mui-disabled {
          color: #7d7e85;
        }
      `;
    }
    case "box": {
      return css`
        border: 1px solid #d6d6d6;
        border-radius: 4px;
        width: 36px;
        color: #7d7e85;
        padding: unset;
        &:hover {
          color: #3e3e3e;
        }

        &.Mui-disabled {
          color: #d6d6d6;
        }
      `;
    }
  }
  return css``;
};

export const typography = (size: "large" | "medium" | "small") => {
  switch (size) {
    case "large":
      return css`
        font-weight: 500;
        font-size: 15px;
        line-height: 26px;
        letter-spacing: 0.46px;
      `;
    case "medium":
      return css`
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        letter-spacing: 0.4px;
      `;
    case "small":
      return css`
        font-weight: 500;
        font-size: 13px;
        line-height: 22px;
        letter-spacing: 0.46px;
      `;
  }
};

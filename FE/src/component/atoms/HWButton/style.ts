import { css } from "@emotion/react";
import Color from "@src/common/styles/Color";

export const root = (size: "xlarge" | "large" | "medium" | "small") => {
  enum heightEnum {
    xlarge = "54px",
    large = "46px",
    medium = "40px",
    small = "36px",
  }
  enum paddingEnum {
    xlarge = "0 37px",
    large = "0 27px",
    medium = "0 19px",
    small = "0 16px",
  }

  return css`
    width: max-content;
    height: ${heightEnum[size]};
    padding: ${paddingEnum[size]};
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    gap: 6px;
    svg {
      font-size: 1rem;
    }
  `;
};

export const variant = (variant: "primary" | "secondary" | "lower" | "lowest" | "box") => {
  switch (variant) {
    case "primary": {
      return css`
        background-color: #6d6ada;
        color: ${Color.dark.baseWhite};
        &:hover {
          background-color: #5354da;
        }
        .MuiTouchRipple-root {
          color: white;
        }
        &.Mui-disabled {
          background-color: #ffffff1f;
          color: #ffffff66;
        }
      `;
    }
    case "secondary": {
      return css`
        background-color: #383838;
        color: #b5b5bd;
        border: solid 1px transparent;
        &:hover {
          background-color: #ffffff1f;
        }
        .MuiTouchRipple-root {
          color: #ffffff;
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
        color: ${Color.dark.primary700};
        border: solid 1px #ffffff1f;
        &:hover {
          background-color: #6d6ada0a;
        }
        .MuiTouchRipple-root {
          color: #bb86fc;
        }
        &.Mui-disabled {
          color: #ffffff66;
        }
      `;
    }
    case "lowest": {
      return css`
        background-color: unset;
        color: ${Color.dark.primary700};
        &:hover {
          background-color: #6d6ada0a;
        }
        .MuiTouchRipple-root {
          color: #bb86fc;
          //color: yellow;
        }
        &.Mui-disabled {
          color: #ffffff66;
        }
      `;
    }
    case "box": {
      return css`
        border: 1px solid #d6d6d6;
        border-radius: 6px;
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

export const typography = (size: "xlarge" | "large" | "medium" | "small") => {
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

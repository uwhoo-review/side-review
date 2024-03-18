import { css } from "@emotion/react";

export default {
  accordion: css`
    margin-bottom: 70px;
    &.Mui-expanded {
      margin-bottom: 70px;
    }
  `,
  wrapper: css``,
  title: css`
    display: flex;
    flex-direction: column;
  `,
  subWrapper: css``,
  typo1: css`
    color: #6d6ada;
  `,
  contentBox: css`
    display: grid;
    grid-template-columns: 1fr 400px 400px;
    grid-template-rows: minmax(160px, auto) minmax(200px, auto) minmax(404px, auto);
    width: 100%;
    min-height: 804px;
    gap: 20px;
  `,
  box: css`
    background-color: #353535;
    border-radius: var(--Main-System-10px, 10px);
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.5);
    border: 1.6px solid var(--Color-Dark-Grey-300, #42424a);

    display: flex;
    flex-direction: column;
    padding: 20px;

    gap: 10px;
    position: relative;
  `,
  box1: css`
    grid-column: 1 / 2;
    grid-row: 1 / 3;
  `,
  box2: css`
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  `,
  box3: css`
    grid-column: 3 / 4;
    grid-row: 1 / 2;
  `,
  box4: css`
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  `,
  box5: css`
    grid-column: 3 / 4;
    grid-row: 2 / 3;
  `,
  box6: css`
    grid-column: 1 / 2;
    grid-row: 3 / 4;
  `,
  box7: css`
    grid-column: 2 / 4;
    grid-row: 3 / 4;
  `,
  flex: css`
    display: flex;
    justify-content: space-around;
    align-items: center;
  `,
  moreBtn: (disabled: boolean) => css`
    position: absolute;
    right: 16px;
    bottom: 20px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    pointer-events: ${disabled ? "none" : "auto"};
    opacity: ${disabled ? 0.5 : 1};
  `,
  emptyWrapper: css`
    height: 314px;
    width: 100%;
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    //background-color: #1e1e1e;
    border-radius: 10px;
  `,
};

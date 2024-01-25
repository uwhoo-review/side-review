import styled from "./style";

const MyPageInfo = ({ topText, middleText, bottomText }: any) => {
  return (
    <div css={styled.wrapper}>
      <div css={styled.typo1}>{topText}</div>
      <div css={styled.typo2}>{middleText}</div>
      <div css={styled.typo3}>{bottomText}</div>
    </div>
  );
};

export default MyPageInfo;

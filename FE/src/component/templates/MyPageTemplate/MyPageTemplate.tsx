import MyPageHeader from "@src/component/organisms/MyPageGrid/Header/MyPageHeader";
import MyPageContent from "@src/component/organisms/MyPageGrid/Contents/MyPageContent";
import styled from "./style";

const MyPageTemplate = () => {
  return (
    <section className={"mypage-template-wrapper"} css={styled.wrapper}>
      <MyPageHeader />
      <MyPageContent />
    </section>
  );
};

export default MyPageTemplate;

import styled from "./style";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import ReviewCard from "@src/component/atoms/ReviewCard/ReviewCard";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import HWButton from "@src/component/atoms/HWButton/HWButton";
import HWToggle from "@src/component/atoms/HWToggle/HWToggle";
import Color from "@src/common/styles/Color";
import {IconUpDown} from "@res/index";

const ReviewCardList = () => {
  return (
    <div className={"review-list-wrapper"} css={styled.wrapper}>
      <CenterWrapper>
        <div css={styled.topWrapper}>
          <div>
            <HWTypography variant={"headlineM"} family={"Pretendard-SemiBold"}>유저 리뷰</HWTypography>
            <span css={styled.typo1}>109 reviews</span>
          </div>
          <div>
            <HWButton variant={"lowest"}>리뷰 전체보기</HWButton>
          </div>
        </div>
        <div css={styled.filterWrapper}>
          <div>
            <HWToggle label={"스포일러 포함"}/>
          </div>
          <div>
            <HWTypography variant={"bodyS"} family={"Pretendard-SemiBold"} color={Color.dark.grey700} customCss={styled.typo2}>
              <IconUpDown/>
              베스트 리뷰
            </HWTypography>
          </div>
        </div>
        <div css={styled.contentWrapper}>
          <ReviewCard
            date={"2023.02.29"}
            best={true}
            spoiler={true}
            footer={true}
            width={"452px"}
            height={"280px"}
          >
            #전 시즌보다 더욱 80년대 촌스러움을 강조한 의상, 소품, 미술, 음악까지 레트로 감성으로
            충만하다.  #드라마 곳곳에 오마주한 추억의 명작들을 품고있다.  #아역배우들의 폭풍성장..;;
            니네 조금 낯설다..  #이번 시즌 최고의 빌런 빌리는... 마인드 플레이어 보다 더 무서움..;;;
            개인적으로 씬스틸러였던 잘생쁜 로빈은 우마서먼과 에단호크의 딸...마야호크😊 #가능하다면
            시즌 1, 2 정주행 추천..ㅎㅎ
          </ReviewCard>
          <ReviewCard
            date={"2023.02.29"}
            best={true}
            spoiler={true}
            footer={true}
            width={"452px"}
            height={"280px"}
          >
            #전 시즌보다 더욱 80년대 촌스러움을 강조한 의상, 소품, 미술, 음악까지 레트로 감성으로
            충만하다.  #드라마 곳곳에 오마주한 추억의 명작들을 품고있다.  #아역배우들의 폭풍성장..;;
            니네 조금 낯설다..  #이번 시즌 최고의 빌런 빌리는... 마인드 플레이어 보다 더 무서움..;;;
            개인적으로 씬스틸러였던 잘생쁜 로빈은 우마서먼과 에단호크의 딸...마야호크😊 #가능하다면
            시즌 1, 2 정주행 추천..ㅎㅎ
          </ReviewCard>
          <ReviewCard
            date={"2023.02.29"}
            best={true}
            spoiler={true}
            footer={true}
            width={"452px"}
            height={"280px"}
          >
            #전 시즌보다 더욱 80년대 촌스러움을 강조한 의상, 소품, 미술, 음악까지 레트로 감성으로
            충만하다.  #드라마 곳곳에 오마주한 추억의 명작들을 품고있다.  #아역배우들의 폭풍성장..;;
            니네 조금 낯설다..  #이번 시즌 최고의 빌런 빌리는... 마인드 플레이어 보다 더 무서움..;;;
            개인적으로 씬스틸러였던 잘생쁜 로빈은 우마서먼과 에단호크의 딸...마야호크😊 #가능하다면
            시즌 1, 2 정주행 추천..ㅎㅎ
          </ReviewCard>
          <ReviewCard
            date={"2023.02.29"}
            best={true}
            spoiler={true}
            footer={true}
            width={"452px"}
            height={"280px"}
          >
            #전 시즌보다 더욱 80년대 촌스러움을 강조한 의상, 소품, 미술, 음악까지 레트로 감성으로
            충만하다.  #드라마 곳곳에 오마주한 추억의 명작들을 품고있다.  #아역배우들의 폭풍성장..;;
            니네 조금 낯설다..  #이번 시즌 최고의 빌런 빌리는... 마인드 플레이어 보다 더 무서움..;;;
            개인적으로 씬스틸러였던 잘생쁜 로빈은 우마서먼과 에단호크의 딸...마야호크😊 #가능하다면
            시즌 1, 2 정주행 추천..ㅎㅎ
          </ReviewCard>
        </div>
      </CenterWrapper>
    </div>
  );
};

export default ReviewCardList;

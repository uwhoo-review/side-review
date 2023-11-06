import styled from "./style";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import ReviewCard from "@src/component/atoms/ReviewCard/ReviewCard";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import HWButton from "@src/component/atoms/HWButton/HWButton";
import HWToggle from "@src/component/atoms/HWToggle/HWToggle";
import Color from "@src/common/styles/Color";
import { IconUpDown } from "@res/index";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import HWDialog from "@src/component/atoms/HWDialog/HWDialog";
import WrapperTitle from "@src/component/atoms/WrapperTitle/WrapperTitle";

const ReviewCardList = ({ total = false, list }: any) => {
  const navigate = useNavigate();
  const [dialog, setDialog] = useState(null);

  return (
    <div className={"review-list-wrapper"} css={styled.wrapper}>
      <>
        <WrapperTitle
          title={"유저 리뷰"}
          subTitle={"109 reviews"}
          rightWrapper={
            <div>
              {!total && (
                <HWTypography
                  variant={"bodyXL"}
                  family={"Pretendard-SemiBold"}
                  color={Color.dark.primary800}
                  customCss={styled.typo1}
                  onClick={() => navigate("reviewTotal")}
                >
                  리뷰 전체보기
                </HWTypography>
              )}
            </div>
          }
        />
        <div css={styled.filterWrapper}>
          <div>
            <HWToggle label={"스포일러 포함"} />
          </div>
          <div>
            <HWTypography
              variant={"bodyS"}
              family={"Pretendard-SemiBold"}
              color={Color.dark.grey700}
              customCss={styled.typo2}
            >
              <IconUpDown />
              베스트 리뷰
            </HWTypography>
          </div>
        </div>
        {total ? (
          <div css={styled.contentTotalWrapper}>
            <ReviewCard
              date={"2023.02.29"}
              best={true}
              spoiler={true}
              footer={true}
              width={"100%"}
              height={"100%"}
            >
              '기묘한 이야기'는 현재 넷플릭스 오리지널 시리즈 중에서도 대표작이라고 할 수 있는
              작품일 것이다. 복고풍, SF, 호러, 음모론이 모두 담긴 아이들의 기상천외한 모험담은
              하나의 신드롬이 됐으며, 짧은 기간동안은 일종의 트렌드가 되기도 했다. 시즌이 거듭되며
              '기묘한 이야기'는 세계관을 확장하고 스케일을 키웠지만 첫 시즌의 신선한 감흥을 능가하진
              못 했다. 더욱이, 이번 시즌을 통해 나는 이 시리즈가 명확한 한계점에 도달했다고 느꼈다. 
               이 시즌에서 가장 인상적인 점은 영상미와 음악이었다. 요즘 미국 드라마의 CG 수준이
              굉장히 좋기 때문에 시각효과의 수준들은 "역시나"하면서 봤으나, 조명, 구도, 색채 같은
              면에서는 더퍼 형제들이 굉장히 많이 발전했다는 생각이 들었다. 정말 한 폭의 다크 판타지
              그림과도 같은 장면들이 매 에피소드마다 나왔고, 형형색색 조명을 전적으로 포용함으로써
              액션 스펙터클부터 긴장감 넘치는 와이드숏까지 모두 굉장히 아름답게 디자인했다고
              생각한다. 존 카펜터 스타일 신스 사운드도 이번 시즌에 계속 이어지지만, 유난히 이번
              시즌의 사운드트랙이 더 마음에 들었던 것 같다. 특히 정적이거나 감정적인 순간들의
              분위기를 고조시키는 순간들에서 굉장히 효과적이었다.   시리즈의 핵심 기둥인 아역
              주인공들의 매력도 이번 시즌에서 계속 돼었다. 아역을 주연급으로 내세우는 많은 영화와
              드라마들이 이 시리즈에서 본 받았으면 하는 점은, 아역 캐릭터들을 굉장히 똑똑한
              캐릭터들로 취급하고 존중해주는 것이다. 엉뚱하기도 하지만 기발하기도 한 발상들과 빠른
              두뇌 회전은 "너드"에 대한 시리즈의 기본적인 애착을 보여주는 면이기도 하나, 한편으로는
              답답함 없이 시원시원한 쾌감을 주는 호감적인 매력 포인트로 작용하기도 한다. 하지만
              우정과 사랑의 관계가 점점 복잡해지며, 영화는 아이들의 감정적 미성숙도 다루며, 성장
              드라마로서의 풋풋함과 감동을 주기도 한다. 여기에 낸시, 조나단, 스티브와 새로 합류한
              로빈의 청년 캐릭터들은 사회로 나아가기 직전인 10대들의 고민과 성장을 보여주며 시즌 1이
              폭발적인 인기를 얻게 된 이유를 다시 한번 상기시켜주었다.   문제는 어른 캐릭터들의
              스토리 라인이다. 데이빗 하버의 짐은 너무 급격하게 캐릭터가 변한 나머지 당황스러웠고,
              시즌이 끝날 때까지 적응이 안 됐다. 위노나 라이더의 극성이고 과장된 연기도 시즌 1과
              2에서는 절박한 모성애로 어느 정도 이해할 수 있었으나, 이번 시즌에서는 도저히 몰입이 안
              됐고 시끄럽기만 했다. 거기에 이들의 이야기와 전개에 너무 많은 개연성 문제와 급전개가
              많아서 다른 작가진이 이 서브플롯을 맡은게 아닌가 싶을 정도였다. 어찌보면 어른스러운
              아이들과 유치한 어른들이라는 재미있는 대비 구도를 만들고자 한 시도일 수도 있으나, 그
              유치한 수준과 방향이 완전히 어긋나버렸다고 생각한다. 스토리 라인이다. 데이빗 하버의
              짐은 너무 급격하게 캐릭터가 변한 나머지 당황스러웠고, 시즌이 끝날 때까지 적응이 안
              됐다. 위노나 라이더의 극성이고 과장된 연기도 시즌 1과 2에서는 절박한 모성애로 어느
              정도 이해할 수 있었으나, 이번 시즌에서는 도저히 몰입이 안 됐고 시끄럽기만 했다. 거기에
              이들의 이야기와 전개에 너무 많은 개연성 문제와 급전개가 많아서 다른 작가진이 이
              서브플롯을 맡은게 아닌가 싶을 정도였다. 어찌보면 어른스러운 아이들과 유치한 아이들과
              유치한 어른들이라는 재미있는 대비 구도를 만들고자 한 시도일 수도 있으나, 그 유치한
              수준과 방향이 완전히 어긋나버렸다고 생각한다.
            </ReviewCard>
            <ReviewCard
              date={"2023.02.29"}
              best={true}
              spoiler={true}
              footer={true}
              width={"100%"}
              height={"auto"}
            >
              #전 시즌보다 더욱 80년대 촌스러움을 강조한 의상, 소품, 미술, 음악까지 레트로 감성으로
              충만하다.  #드라마 곳곳에 오마주한 추억의 명작들을 품고있다.  #아역배우들의
              폭풍성장..;; 니네 조금 낯설다..  #이번 시즌 최고의 빌런 빌리는... 마인드 플레이어 보다
              더 무서움..;;; 개인적으로 씬스틸러였던 잘생쁜 로빈은 우마서먼과 에단호크의
              딸...마야호크😊 #가능하다면 시즌 1, 2 정주행 추천..ㅎㅎ
            </ReviewCard>
            <ReviewCard
              date={"2023.02.29"}
              best={true}
              spoiler={true}
              footer={true}
              width={"100%"}
              height={"auto"}
            >
              #전 시즌보다 더욱 80년대 촌스러움을 강조한 의상, 소품, 미술, 음악까지 레트로 감성으로
              충만하다.  #드라마 곳곳에 오마주한 추억의 명작들을 품고있다.  #아역배우들의
              폭풍성장..;; 니네 조금 낯설다..  #이번 시즌 최고의 빌런 빌리는... 마인드 플레이어 보다
              더 무서움..;;; 개인적으로 씬스틸러였던 잘생쁜 로빈은 우마서먼과 에단호크의
              딸...마야호크😊 #가능하다면 시즌 1, 2 정주행 추천..ㅎㅎ
            </ReviewCard>
            <ReviewCard
              date={"2023.02.29"}
              best={true}
              spoiler={true}
              footer={true}
              width={"100%"}
              height={"auto"}
            >
              #전 시즌보다 더욱 80년대 촌스러움을 강조한 의상, 소품, 미술, 음악까지 레트로 감성으로
              충만하다.  #드라마 곳곳에 오마주한 추억의 명작들을 품고있다.  #아역배우들의
              폭풍성장..;; 니네 조금 낯설다..  #이번 시즌 최고의 빌런 빌리는... 마인드 플레이어 보다
              더 무서움..;;; 개인적으로 씬스틸러였던 잘생쁜 로빈은 우마서먼과 에단호크의
              딸...마야호크😊 #가능하다면 시즌 1, 2 정주행 추천..ㅎㅎ
            </ReviewCard>
            <ReviewCard
              date={"2023.02.29"}
              best={true}
              spoiler={true}
              footer={true}
              width={"100%"}
              height={"auto"}
            >
              #전 시즌보다 더욱 80년대 촌스러움을 강조한 의상, 소품, 미술, 음악까지 레트로 감성으로
              충만하다.  #드라마 곳곳에 오마주한 추억의 명작들을 품고있다.  #아역배우들의
              폭풍성장..;; 니네 조금 낯설다..  #이번 시즌 최고의 빌런 빌리는... 마인드 플레이어 보다
              더 무서움..;;; 개인적으로 씬스틸러였던 잘생쁜 로빈은 우마서먼과 에단호크의
              딸...마야호크😊 #가능하다면 시즌 1, 2 정주행 추천..ㅎㅎ
            </ReviewCard>
            <ReviewCard
              date={"2023.02.29"}
              best={true}
              spoiler={true}
              footer={true}
              width={"100%"}
              height={"auto"}
            >
              #전 시즌보다 더욱 80년대 촌스러움을 강조한 의상, 소품, 미술, 음악까지 레트로 감성으로
              충만하다.  #드라마 곳곳에 오마주한 추억의 명작들을 품고있다.  #아역배우들의
              폭풍성장..;; 니네 조금 낯설다..  #이번 시즌 최고의 빌런 빌리는... 마인드 플레이어 보다
              더 무서움..;;; 개인적으로 씬스틸러였던 잘생쁜 로빈은 우마서먼과 에단호크의
              딸...마야호크😊 #가능하다면 시즌 1, 2 정주행 추천..ㅎㅎ
            </ReviewCard>
            <ReviewCard
              date={"2023.02.29"}
              best={true}
              spoiler={true}
              footer={true}
              width={"100%"}
              height={"auto"}
            >
              #전 시즌보다 더욱 80년대 촌스러움을 강조한 의상, 소품, 미술, 음악까지 레트로 감성으로
              충만하다.  #드라마 곳곳에 오마주한 추억의 명작들을 품고있다.  #아역배우들의
              폭풍성장..;; 니네 조금 낯설다..  #이번 시즌 최고의 빌런 빌리는... 마인드 플레이어 보다
              더 무서움..;;; 개인적으로 씬스틸러였던 잘생쁜 로빈은 우마서먼과 에단호크의
              딸...마야호크😊 #가능하다면 시즌 1, 2 정주행 추천..ㅎㅎ
            </ReviewCard>
            <ReviewCard
              date={"2023.02.29"}
              best={true}
              spoiler={true}
              footer={true}
              width={"100%"}
              height={"auto"}
            >
              #전 시즌보다 더욱 80년대 촌스러움을 강조한 의상, 소품, 미술, 음악까지 레트로 감성으로
              충만하다.  #드라마 곳곳에 오마주한 추억의 명작들을 품고있다.  #아역배우들의
              폭풍성장..;; 니네 조금 낯설다..  #이번 시즌 최고의 빌런 빌리는... 마인드 플레이어 보다
              더 무서움..;;; 개인적으로 씬스틸러였던 잘생쁜 로빈은 우마서먼과 에단호크의
              딸...마야호크😊 #가능하다면 시즌 1, 2 정주행 추천..ㅎㅎ
            </ReviewCard>
          </div>
        ) : (
          <div css={styled.contentWrapper}>
            {list.map((v: any, i: number) => {
              return (
                <ReviewCard
                  date={"2023.02.29"}
                  best={true}
                  spoiler={true}
                  footer={true}
                  width={"452px"}
                  height={"280px"}
                  onClick={() => setDialog(v.contents)}
                >
                  {v.contents}
                </ReviewCard>
              );
            })}
          </div>
        )}
      </>
      <HWDialog open={Boolean(dialog)} onClose={() => setDialog(null)}>
        <ReviewCard
          date={"2023.02.29"}
          best={true}
          spoiler={true}
          footer={true}
          width={"800px"}
          height={"570px"}
        >
          {dialog}
        </ReviewCard>
      </HWDialog>
    </div>
  );
};

export default ReviewCardList;

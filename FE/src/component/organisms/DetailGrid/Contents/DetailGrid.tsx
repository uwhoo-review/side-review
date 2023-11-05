import InformationBox from "@src/component/molecules/InformationBox/InformationBox";
import BoxList from "@src/component/molecules/BoxList/BoxList";
import img1 from "@res/temp/img1.png";
import img2 from "@res/temp/img2.png";
import img3 from "@res/temp/img3.png";
import img4 from "@res/temp/img4.png";
import DefaultImage from "@src/component/atoms/DefaultImage/DefaultImage";
import PersonCardList from "@src/component/molecules/PersonCardList/PersonCardList";
import RatingDetailBox from "@src/component/molecules/RatingDetailBox/RatingDetailBox";
import ReviewCardList from "@src/component/molecules/ReviewCardList/ReviewCardList";
import WrapperTitle from "@src/component/atoms/WrapperTitle/WrapperTitle";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import { useState } from "react";
import HWDialog from "@src/component/atoms/HWDialog/HWDialog";
import HWAlert from "@src/component/atoms/HWAlert";

const DetailGrid = () => {
  const [dialog, setDialog] = useState<any>(null);

  return (
    <>
      <InformationBox />
      <RatingDetailBox />
      <ReviewCardList
        total={false}
        list={[
          {
            contents:
              "#전 시즌보다 더욱 80년대 촌스러움을 강조한 의상, 소품, 미술, 음악까지 레트로 감성으로 충만하다. #드라마 곳곳에 오마주한 추억의 명작들을 품고있다. #아역배우들의 폭풍성장..;; 니네 조금 낯설다.. #이번 시즌 최고의 빌런 빌리는... 마인드 플레이어 보다 더 무서움..;;; 개인적으로 씬스틸러였던 잘생쁜 로빈은 우마서먼과 에단호크의 딸...마야호크😊 #가능하다면 시즌 1, 2 정주행 추천..ㅎㅎ",
          },
          {
            contents:
              "#전 시즌보다 더욱 80년대 촌스러움을 강조한 의상, 소품, 미술, 음악까지 레트로 감성으로 충만하다. #드라마 곳곳에 오마주한 추억의 명작들을 품고있다. #아역배우들의 폭풍성장..;; 니네 조금 낯설다.. #이번 시즌 최고의 빌런 빌리는... 마인드 플레이어 보다 더 무서움..;;; 개인적으로 씬스틸러였던 잘생쁜 로빈은 우마서먼과 에단호크의 딸...마야호크😊 #가능하다면 시즌 1, 2 정주행 추천..ㅎㅎ",
          },
          {
            contents:
              "#전 시즌보다 더욱 80년대 촌스러움을 강조한 의상, 소품, 미술, 음악까지 레트로 감성으로 충만하다. #드라마 곳곳에 오마주한 추억의 명작들을 품고있다. #아역배우들의 폭풍성장..;; 니네 조금 낯설다.. #이번 시즌 최고의 빌런 빌리는... 마인드 플레이어 보다 더 무서움..;;; 개인적으로 씬스틸러였던 잘생쁜 로빈은 우마서먼과 에단호크의 딸...마야호크😊 #가능하다면 시즌 1, 2 정주행 추천..ㅎㅎ",
          },
          {
            contents:
              "#전 시즌보다 더욱 80년대 촌스러움을 강조한 의상, 소품, 미술, 음악까지 레트로 감성으로 충만하다. #드라마 곳곳에 오마주한 추억의 명작들을 품고있다. #아역배우들의 폭풍성장..;; 니네 조금 낯설다.. #이번 시즌 최고의 빌런 빌리는... 마인드 플레이어 보다 더 무서움..;;; 개인적으로 씬스틸러였던 잘생쁜 로빈은 우마서먼과 에단호크의 딸...마야호크😊 #가능하다면 시즌 1, 2 정주행 추천..ㅎㅎ",
          },
          {
            contents:
              "#전 시즌보다 더욱 80년대 촌스러움을 강조한 의상, 소품, 미술, 음악까지 레트로 감성으로 충만하다. #드라마 곳곳에 오마주한 추억의 명작들을 품고있다. #아역배우들의 폭풍성장..;; 니네 조금 낯설다.. #이번 시즌 최고의 빌런 빌리는... 마인드 플레이어 보다 더 무서움..;;; 개인적으로 씬스틸러였던 잘생쁜 로빈은 우마서먼과 에단호크의 딸...마야호크😊 #가능하다면 시즌 1, 2 정주행 추천..ㅎㅎ",
          },
        ]}
      />
      <CenterWrapper>
        <WrapperTitle title={"출연 ∙ 제작"} />
        <PersonCardList cardList={[...new Array(15)]} />
      </CenterWrapper>
      <BoxList
        title={"트레일러"}
        boxList={[
          <iframe
            key={1}
            src={"https://www.youtube.com/embed/cqf0Ni3Jo_I?si=nZpAgMee9mFVwBax"}
            width={"334"}
            height={"189"}
          />,
          <iframe
            key={2}
            src={"https://www.youtube.com/embed/cqf0Ni3Jo_I?si=nZpAgMee9mFVwBax"}
            width={"334"}
            height={"189"}
          />,
          <iframe
            key={3}
            src={"https://www.youtube.com/embed/cqf0Ni3Jo_I?si=nZpAgMee9mFVwBax"}
            width={"334"}
            height={"189"}
          />,
          <iframe
            key={4}
            src={"https://www.youtube.com/embed/cqf0Ni3Jo_I?si=nZpAgMee9mFVwBax"}
            width={"334"}
            height={"189"}
          />,
        ]}
      />
      <BoxList
        title={"포토"}
        boxList={[
          <DefaultImage
            key={1}
            src={img4}
            width={"334px"}
            height={"189px"}
            onClick={() => setDialog(<DefaultImage src={img4} width={"100%"} height={"100%"} />)}
          />,
          <DefaultImage key={2} src={img2} width={"334px"} height={"189px"} />,
          <DefaultImage key={3} src={img3} width={"334px"} height={"189px"} />,
          <DefaultImage key={4} src={img1} width={"334px"} height={"189px"} />,
          <DefaultImage key={5} src={img4} width={"334px"} height={"189px"} />,
        ]}
      />
      <HWDialog open={Boolean(dialog)} onClose={() => setDialog(null)}>
        <>{dialog}</>
      </HWDialog>
    </>
  );
};

export default DetailGrid;

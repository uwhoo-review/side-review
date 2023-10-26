import InformationBox from "@src/component/molecules/InformationBox/InformationBox";
import BoxList from "@src/component/molecules/BoxList/BoxList";
import img1 from "@res/temp/img1.png";
import img2 from "@res/temp/img2.png";
import img3 from "@res/temp/img3.png";
import DefaultImage from "@src/component/atoms/DefaultImage/DefaultImage";
import PersonCard from "@src/component/atoms/PersonCard/PersonCard";
import PersonCardList from "@src/component/molecules/PersonCardList/PersonCardList";
import ReviewCard from "@src/component/atoms/ReviewCard/ReviewCard";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import RatingDetailBox from "@src/component/molecules/RatingDetailBox/RatingDetailBox";
import ReviewCardList from "@src/component/molecules/ReviewCardList/ReviewCardList";

const DetailGrid = () => {
  return (
    <>
      <InformationBox />
      <RatingDetailBox />
      <ReviewCardList />
      <PersonCardList cardList={[...new Array(15)]} />
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
            key={1}
            src={"https://www.youtube.com/embed/cqf0Ni3Jo_I?si=nZpAgMee9mFVwBax"}
            width={"334"}
            height={"189"}
          />,
          <iframe
            key={1}
            src={"https://www.youtube.com/embed/cqf0Ni3Jo_I?si=nZpAgMee9mFVwBax"}
            width={"334"}
            height={"189"}
          />,
          <iframe
            key={1}
            src={"https://www.youtube.com/embed/cqf0Ni3Jo_I?si=nZpAgMee9mFVwBax"}
            width={"334"}
            height={"189"}
          />,
        ]}
      />
      <BoxList
        title={"포토"}
        boxList={[
          <DefaultImage key={1} src={img1} width={"334px"} height={"189px"} />,
          <DefaultImage key={2} src={img2} width={"334px"} height={"189px"} />,
          <DefaultImage key={3} src={img3} width={"334px"} height={"189px"} />,
          <DefaultImage key={4} src={img3} width={"334px"} height={"189px"} />,
          <DefaultImage key={5} src={img3} width={"334px"} height={"189px"} />,
        ]}
      />
    </>
  );
};

export default DetailGrid;

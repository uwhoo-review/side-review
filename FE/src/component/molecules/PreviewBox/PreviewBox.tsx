import styled from "./style";
import ReviewCard from "@src/component/atoms/ReviewCard/ReviewCard";
import CarouselArrow from "@src/component/atoms/CarouselArrow/CarouselArrow";
import Divider from "@src/component/atoms/Divider/Divider";

const PreviewBox = ({ customCss }: any) => {
  return (
    <div className="preview-box-wrapper" css={[styled.wrapper, customCss]}>
      <div css={styled.leftWrapper}>
        <CarouselArrow direction={"left"} />
      </div>
      <div css={styled.contents}>
        <div css={styled.topContents}>
          <div css={styled.leftContents}>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/Sf5xHaa_vxc?si=Yy4QSfD6mpokGb6l"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div css={styled.rightContents}>
            <div> 제목 </div>
            <Divider />
          </div>
        </div>
        <div css={styled.bottomContents}>
          <ReviewCard best={true} date={"2023.02.29"}>
            초능력을 숨긴 채 현재를 살아가는 아이들과, 과거의 아픈 비밀을 숨긴 채 살아온 부모들이
            시대와 세대를 넘어 닥치는 거대한 위험에 함께 맞서는 초능력 액션 히어로물. 초능력을 숨긴
            채 현재를 살아가는 아이들과, 과거의 아픈 비밀을 숨긴 채 살아온 부모들이 시대와 세대를
            넘어 닥치는 거 블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라
          </ReviewCard>
          <ReviewCard best={false} date={"2023.02.29"}>
            asd
          </ReviewCard>
          <ReviewCard best={false} date={"2023.02.29"}>
            asd
          </ReviewCard>
        </div>
      </div>
      <div css={styled.rightWrapper}>
        <CarouselArrow direction={"right"} />
      </div>
    </div>
  );
};

export default PreviewBox;

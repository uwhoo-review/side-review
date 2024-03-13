import CarouselArrow from "@src/component/atoms/CarouselArrow/CarouselArrow";
import ContentCard from "@src/component/atoms/ContentCard/ContentCard";
import { useEffect, useState } from "react";
import styled from "./style";
import PersonCardVertical from "@src/component/atoms/PersonCardVertical/PersonCardVertical";
import { useNavigate } from "react-router-dom";
import HWIconButton from "@src/component/atoms/HWIconButton/HWIconButton";
import CloseIcon from "@mui/icons-material/Close";

const CardSliderPerson = ({ cardList, onDelete }: any) => {
  const navigate = useNavigate();

  const TOTAL_LIST = cardList.length;
  const MOVE = 1;
  const TOTAL_PAGE = TOTAL_LIST <= 9 ? 1 : Math.ceil((TOTAL_LIST - 9) / MOVE) + 1;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [firstIdx, setFirstIdx] = useState(1);
  const [lastIdx, setLastIdx] = useState(9);
  const [translateX, setTranslateX] = useState(0);

  const onPrevHandler = () => {
    if (currentPage === 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage - 1);
      if (firstIdx - MOVE > 1) {
        setFirstIdx((prev) => prev - MOVE);
        setLastIdx((prev) => prev - MOVE);
      } else {
        setFirstIdx((prev) => 1);
        setLastIdx((prev) => prev - (firstIdx - 1));
      }
    }
  };

  const onNextHandler = () => {
    if (currentPage === TOTAL_PAGE) {
      setCurrentPage(TOTAL_PAGE);
    } else {
      setCurrentPage(currentPage + 1);
      if (lastIdx + MOVE < TOTAL_LIST) {
        setFirstIdx((prev) => prev + MOVE);
        setLastIdx((prev) => prev + MOVE);
      } else {
        setFirstIdx((prev) => prev + TOTAL_LIST - lastIdx);
        setLastIdx((prev) => TOTAL_LIST);
      }
    }
  };

  useEffect(() => {
    const x = (firstIdx - 1) * (-102 - 30);
    setTranslateX(x);
  }, [firstIdx]);

  return (
    <div css={styled.cardSlider(currentPage, TOTAL_PAGE)}>
      <CarouselArrow
        className={"hover-arrow left"}
        direction={"left"}
        customCss={styled.leftPageBtn}
        onClick={onPrevHandler}
      />
      <div className={"image-card-list"} css={styled.cardWrapper(translateX, false)}>
        {cardList.map((v: any, i: number) => {
          const jobLen = v.job.length;
          let job = "";
          if (jobLen > 1) {
            job = v.job[0] + ` + ${jobLen - 1}`;
          } else {
            job = v.job[0];
          }
          return (
            <div className={"content-slide"} key={v.id}>
              {
                <HWIconButton
                  className={"content-close-button"}
                  aria-label="close"
                  onClick={() => onDelete(v.id)}
                  css={[styled.closeButton]}
                >
                  <CloseIcon />
                </HWIconButton>
              }
              <PersonCardVertical
                id={v.id}
                name={v.name}
                subName={job}
                srcId={v.profilePath}
                className={"image-card"}
                key={i}
                customCss={styled.card}
                onClick={() => {
                  navigate(`/person/${v.id}`);
                }}
              />
            </div>
          );
        })}
      </div>
      <CarouselArrow
        className={"hover-arrow right"}
        direction={"right"}
        customCss={styled.rightPageBtn}
        onClick={onNextHandler}
      />
    </div>
  );
};

export default CardSliderPerson;

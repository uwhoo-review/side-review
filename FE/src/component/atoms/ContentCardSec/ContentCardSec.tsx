import styled from "./style";
import { IconLaunch, IconNetflix, IconRating, IconStar, IconTving, IconWatcha } from "@res/index";
import { SerializedStyles } from "@emotion/react";
import DefaultImage from "@src/component/atoms/DefaultImage/DefaultImage";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import Color from "@src/common/styles/Color";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCardURL } from "@src/tools/commonTools";
import { RatingDO, SeasonDO } from "@src/interfaces/api.interface";

interface ContentCardSecProps {
  id: string;
  srcId: string;
  contentName: string;
  platform?: number[];
  className?: string;
  age?: string;
  date?: string;
  active: boolean;
  launch?: boolean;
  rank?: number;
  rating?: number;
  userRating: number;
  season?: SeasonDO;
  onClick?: (e: React.MouseEvent) => void;
  customCss?: SerializedStyles;
  type?: string;
}
const ContentCardSec = ({
  id,
  srcId,
  contentName,
  rating,
  platform,
  age,
  date,
  launch = true,
  className,
  rank,
  onClick,
  customCss,
  season,
  active,
  userRating,
  type = "first",
  ...props
}: ContentCardSecProps) => {
  const navigate = useNavigate();
  const divRef = useRef<any>(null);
  const [isOverflow, setIsOverflow] = useState<boolean>(false);
  let classNames = [];
  classNames.push(
    "content-card-wrapper",
    active ? `active` : "in-active",
    className ? `${className}` : null
  );
  classNames = classNames.filter(Boolean);

  useEffect(() => {
    if (divRef.current) {
      if (divRef.current?.clientWidth < divRef.current?.scrollWidth) setIsOverflow(true);
    }
  }, []);

  return (
    <div
      className={classNames.join(" ")}
      css={[styled.wrapper(active), styled.variant(type), customCss]}
      onClick={onClick}
      {...props}
    >
      <div className={`card-box`} css={styled.imgWrapper(active)}>
        {rank && <div css={styled.rank}>{rank}</div>}
        <DefaultImage
          width="100%"
          height="100%"
          alt=""
          src={getCardURL({ type: "content", srcId: srcId })}
        />
        {season && season.now > 1 && <div css={styled.seasonLabel}>{`시즌 ${season.now}`}</div>}
      </div>
      <div css={styled.description}>
        <div className={"title"} css={styled.title}>
          <div
            className={"title-text"}
            css={styled.marquee}
            ref={divRef}
            data-overflow={isOverflow}
          >
            {contentName}
          </div>
        </div>
        <div css={styled.flexBetween}>
          <>
            {type === "first" && (
              <div className={"title-star"} css={styled.flexBetween}>
                <HWTypography variant={"bodyXS"} color={Color.dark.grey400} css={styled.typo1}>
                  평균 별점
                </HWTypography>
                <div css={styled.rating}>
                  <IconStar css={styled.iconStar} />
                  <HWTypography variant={"bodyXS"}>{rating || 0}</HWTypography>
                </div>
                <HWTypography variant={"bodyXS"} color={Color.dark.grey400} css={styled.typo1}>
                  내 별점
                </HWTypography>
                <div css={styled.rating}>
                  <IconRating css={styled.iconStar} />
                  <HWTypography variant={"bodyXS"}>{userRating || 0}</HWTypography>
                </div>
              </div>
            )}
            {type === "second" && (
              <div className={"title-star"} css={styled.flexBetween2}>
                <HWTypography variant={"bodyXS"} color={"#6D6ADA"}>
                  내 별점
                </HWTypography>
                <div css={styled.rating}>
                  <IconRating css={styled.iconStar} />
                  <HWTypography variant={"bodyXS"}>{userRating || 0}</HWTypography>
                </div>
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default ContentCardSec;

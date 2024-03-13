import styled from "./style";
import { IconLaunch, IconNetflix, IconStar, IconTving, IconWatcha } from "@res/index";
import { SerializedStyles } from "@emotion/react";
import DefaultImage from "@src/component/atoms/DefaultImage/DefaultImage";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import Color from "@src/common/styles/Color";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCardURL } from "@src/tools/commonTools";
import PlatformAvatar from "@src/component/molecules/PlatformAvatar/PlatformAvatar";
import { RatingDO, SeasonDO } from "@src/interfaces/api.interface";
import { DragPreviewImage, useDrag, useDrop, XYCoord } from "react-dnd";
interface ContentCardProps {
  id: string;
  srcId: string;
  contentName: string;
  platform?: number[];
  className?: string;
  age?: string;
  date: string;
  active: boolean;
  launch?: boolean;
  rank?: number;
  rating?: RatingDO;
  season?: SeasonDO;
  onClick?: (e: React.MouseEvent) => void;
  moveCard?: (dragId: string, hoverId: string) => void;
  findCard?: any;
  customCss?: SerializedStyles;
  isHoverScale?: boolean;
}

const ContentDragCard = ({
  id,
  srcId,
  contentName,
  rating,
  platform = [],
  age,
  date,
  launch = true,
  className,
  rank,
  onClick,
  customCss,
  season,
  active,
  moveCard,
  findCard,
  isHoverScale = true,
  ...props
}: ContentCardProps) => {
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

  const [{ isOver }, drop] = useDrop(
    {
      accept: "CARD",
      collect: (monitor: any) => ({
        isOver: monitor.isOver({ shallow: true }),
      }),
      drop({ id: draggedId }: any) {
        if (draggedId !== id) {
          // const { index: dragIdx } = findCard(draggedId);
          // const { index: overIdx } = findCard(id);
          moveCard && moveCard(draggedId, id);
        }
      },
    },
    [moveCard, findCard]
  );

  const [{ opacity, isDragging }, drag, preview] = useDrag(
    {
      type: "CARD",
      item: { id },
      collect: (monitor: any) => ({
        opacity: monitor.isDragging() ? 0.2 : 1,
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {},
    },
    [id, moveCard]
  );

  useEffect(() => {
    if (divRef.current) {
      if (divRef.current?.clientWidth < divRef.current?.scrollWidth) setIsOverflow(true);
    }
  }, []);

  return (
    <div css={styled.totalWrapper}>
      <div
        css={styled.sortableWrapper}
        ref={(node) => {
          drop(node);
        }}
      >
        <div
          css={styled.sortableLine}
          style={{
            opacity: isOver ? 1 : 0,
          }}
        />
      </div>

      <div
        className={classNames.join(" ")}
        css={[styled.wrapper(active), customCss]}
        style={{ opacity }}
        onClick={onClick}
        {...props}
      >
        <div className={`card-box`} css={styled.imgWrapper(active, isHoverScale)}>
          {rank && rank < 100 && <div css={styled.rank}>{rank}</div>}
          {season && season.now > 1 && <div css={styled.seasonLabel}>{`시즌 ${season.now}`}</div>}

          <div
            ref={(node) => {
              drag(node);
            }}
            css={styled.dragBox}
          >
            <DefaultImage
              width="100%"
              height="100%"
              alt=""
              src={getCardURL({ type: "content", srcId: srcId })}
            />
          </div>
          <DragPreviewImage
            connect={preview}
            src={getCardURL({ type: "content", srcId: srcId, size: "w154" })}
          />
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
            <div className={"title-star"} css={styled.flexBetween}>
              <div css={styled.rating}>
                <IconStar css={styled.iconStar} />
                <HWTypography variant={"bodyXS"}>{rating?.rating || 0}</HWTypography>
              </div>
              <HWTypography variant={"bodyXS"} color={Color.dark.grey400} css={styled.typo1}>
                {date}
              </HWTypography>
            </div>
            <PlatformAvatar list={platform} max={3} direction={"right"} />
          </div>
          {launch && (
            <IconLaunch
              className={"icon-launch"}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/detail/${id}`);
              }}
              css={styled.Launch}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentDragCard;

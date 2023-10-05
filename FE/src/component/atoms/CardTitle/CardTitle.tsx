import styled from "./style";
import IcNetflix from "@res/icon/ic_netflix.svg";
import IcStar from "@res/icon/ic_star.svg";
// import {ReactComponent as Test} from "@res/icon/ic_star.svg";

interface CardTitleProps {
    title: string;
    grade: string;
    ott?: string[];
}
const CardTitle = ({title,grade,ott}:CardTitleProps) => {


    return (
        <div css={styled.wrapper}>
            <div className={"title"}>{title}</div>
            <div css={styled.flexBetween}>
                <div className={"title-star"}>
                    <IcStar />
                    {grade}
                </div>
                <IcNetflix />
            </div>
        </div>
    )
}

export default CardTitle;

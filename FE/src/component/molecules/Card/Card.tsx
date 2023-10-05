import styled from "./style";
import CardImage from "@src/component/atoms/CardImage/CardImage";
import card1 from "@res/card/card1.png";
import CardTitle from "@src/component/atoms/CardTitle/CardTitle";

interface CardProps {
    rank?: number;

}
const Card = ({rank}: CardProps) => {


    return (
        <div css={styled.wrapper}>
            {rank && <div css={styled.rank}>{rank}</div>}
            <CardImage src={card1} />
            <CardTitle title={"더 랍스터"} grade={"4.5"} />
        </div>
    )
}

export default Card;

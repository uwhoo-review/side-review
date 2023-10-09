import styled from "./style";
interface ImageCardProps {
  src: string;
  height?: string;
  width?: string;
}
const CardImage = ({ src, height, width }: ImageCardProps) => {
  return <img css={styled.wrapper} alt="" src={src} />;
};

export default CardImage;

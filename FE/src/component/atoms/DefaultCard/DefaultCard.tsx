import styled from "./style";

const DefaultCard = ({ src = "", width = "216px", height = "324px", customCss }: any) => {
  return (
    <img
      src={src}
      className={"default-card-wrapper"}
      css={[styled.wrapper(width, height), customCss]}
    ></img>
  );
};

export default DefaultCard;

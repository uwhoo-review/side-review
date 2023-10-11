import Content from "@src/component/organisms/Content/Content";
import styled from "./style";
import {useAppDispatch, useAppSelector} from "@src/redux/hooks";
import {dogActions} from "@src/redux/dogSlice";

const MainTemplate = () => {
  const dispatch = useAppDispatch();

  const dagData = useAppSelector((state) => state.dog);
  console.log(dagData);

  return (
    <>
      <div css={styled.wrapper}>
        <div className={"scroll-area none-draggable"}>
          <div className={"select-main custom-scroll-area"}>
            <Content />
            <button onClick={() => {dispatch(dogActions.setDogs([1,2,3]))}}>test</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default MainTemplate;

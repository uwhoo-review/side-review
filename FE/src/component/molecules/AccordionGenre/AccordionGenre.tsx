import styled from "./style";
import MenuAccordion from "@src/component/atoms/MenuAccordion/MenuAccordion";
import { useState } from "react";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import HWToggleButton from "@src/component/atoms/HWToggleButton/HWToggleButton";
import { GENRE_ID, GENRE_ID_NAME, GENRE_NAME } from "@src/variables/CommonConstants";
import { IconCheck } from "@res/index";
import HWDialog from "@src/component/atoms/HWDialog";

const AccordionGenre = () => {
  const [open, setOpen] = useState(false);

  const [genre, setGenre] = useState([80, 99, 18, 10751, 10762, 9648, 10763]);
  const props = (v: number) => {
    const idx = genre.indexOf(v);
    return {
      checked: genre.includes(v),
      onClick: () => {
        idx === -1
          ? setGenre((prev) => [...prev, v])
          : setGenre((prev) => [...prev.splice(idx, 1)]);
      },
    };
  };

  return (
    <>
      <MenuAccordion
        title={
          <div css={styled.title}>
            <HWTypography variant={"headlineS"} family={"Pretendard-SemiBold"} color={"#ffffff"}>
              좋아하는 장르
            </HWTypography>
            <HWTypography variant={"headlineXXS"} family={"Pretendard"} color={"#D9DAE5"}>
              <>
                <span css={styled.typo1}>웨이드</span>
                님이 좋아하는 장르는 어떤 것인가요? 맞춤 추천을 더 잘 제공할 수 있어요!{" "}
              </>
            </HWTypography>
          </div>
        }
        isExpanded={open}
        switchExpanded={() => setOpen(!open)}
        customCss={styled.accordion}
      >
        <div css={styled.subWrapper}>
          <div css={styled.contentBox}>
            <div css={styled.toggleBox}>
              {Object.values(GENRE_ID)
                .sort((a, b) => a - b)
                .slice(0, 8)
                .map((v: any) => (
                  <HWToggleButton
                    key={v}
                    checked={genre.includes(v)}
                    onClick={() => {
                      const idx = genre.indexOf(v);
                      idx === -1
                        ? setGenre((prev) => [...genre, v])
                        : setGenre((prev) => [...genre.filter((g) => g !== v)]);
                    }}
                    customCss={styled.toggle}
                  >
                    {genre.includes(v) && <IconCheck color={"#B6B2EA"} />}
                    {GENRE_ID_NAME[v]}
                  </HWToggleButton>
                ))}
            </div>
            <div css={styled.toggleBox}>
              {Object.values(GENRE_ID)
                .sort((a, b) => a - b)
                .slice(8)
                .map((v: any) => (
                  <HWToggleButton
                    key={v}
                    checked={genre.includes(v)}
                    onClick={() => {
                      const idx = genre.indexOf(v);
                      idx === -1
                        ? setGenre((prev) => [...genre, v])
                        : setGenre((prev) => [...genre.filter((g) => g !== v)]);
                    }}
                    customCss={styled.toggle}
                  >
                    {genre.includes(v) && <IconCheck color={"#B6B2EA"} />}
                    {GENRE_ID_NAME[v]}
                  </HWToggleButton>
                ))}
            </div>
          </div>
        </div>
      </MenuAccordion>

    </>
  );
};

export default AccordionGenre;

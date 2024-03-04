import styled from "./style";
import MenuAccordion from "@src/component/atoms/MenuAccordion/MenuAccordion";
import { useEffect, useState } from "react";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import HWToggleButton from "@src/component/atoms/HWToggleButton/HWToggleButton";
import { GENRE_ID, GENRE_ID_NAME, GENRE_NAME } from "@src/variables/CommonConstants";
import { IconCheck } from "@res/index";
import HWDialog from "@src/component/atoms/HWDialog";
import { UWAxios } from "@src/common/axios/AxiosConfig";

const AccordionGenre = ({ genreList, user }: any) => {
  const [open, setOpen] = useState(true);

  const [genre, setGenre] = useState<number[]>([]);

  useEffect(() => {
    setGenre(genreList);
  }, [genreList]);

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
                <span css={styled.typo1}>{user.nickname}</span>
                님이 좋아하는 장르는 어떤 것인가요? 맞춤 추천을 더 잘 제공할 수 있어요!
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
                    onClick={async () => {
                      const idx = genre.indexOf(v);
                      const tmpGenre =
                        idx === -1 ? [...genre, v] : [...genre.filter((g) => g !== v)];
                      setGenre(tmpGenre);
                      const res = await UWAxios.user.putMyGenre(tmpGenre);
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
                    onClick={async () => {
                      const idx = genre.indexOf(v);
                      const tmpGenre =
                        idx === -1 ? [...genre, v] : [...genre.filter((g) => g !== v)];
                      setGenre(tmpGenre);
                      const res = await UWAxios.user.putMyGenre(tmpGenre);
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

import { Dialog } from "@mui/material";
import { HWDialogProps } from "./type";
import * as style from "./style";

const HWDialog = ({ className, customCss, children, width, height, ...props }: HWDialogProps) => {
  return (
    <Dialog className={className} css={[style.root(width, height), customCss]} {...props}>
      {children}
    </Dialog>
  );
};

export default HWDialog;

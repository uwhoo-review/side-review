import { default as HWDialogMain } from "./HWDialog";
import HWDialogContent from "./HWDialogContent";
import HWDialogTitle from "./HWDialogTitle";
import HWDialogActions from "./HWDialogActions";

const HWDialog = Object.assign(HWDialogMain, {
  Title: HWDialogTitle,
  Content: HWDialogContent,
  Actions: HWDialogActions,
});

export default HWDialog;

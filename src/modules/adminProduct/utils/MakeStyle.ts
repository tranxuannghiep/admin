import { makeStyles } from "@mui/styles";

export const useStylesSwitch = makeStyles({
  root: {
    width: "52px !important",
    height: "22px !important",
    padding: "0px !important",
    borderRadius: "4px !important",
  },
  switchBase: {
    color: "#818181 !important",
    padding: "1px !important",
    borderRadius: "4px !important",
    "&$checked": {
      "& + $track": {
        backgroundColor: "#1ab394 !important",
      },
    },
  },
  thumb: {
    color: "white !important",
    width: "24px !important",
    height: "22px !important",
    borderRadius: "4px !important",
  },
  track: {
    backgroundColor: "#818181 !important",
    borderRadius: "0 !important",
    opacity: "1 !important",
    "&:after, &:before": {
      color: "white !important",
      fontSize: "12px !important",
      position: "absolute !important",
      top: "2px !important",
    },
    "&:after": {
      content: "'YES'",
      left: "4px !important",
    },
    "&:before": {
      content: "'NO'",
      right: "6px !important",
    },
  },
  checked: {
    color: "#1ab394 !important",
    transform: "translateX(26px) !important",
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      marginTop: 8,
    },
  },
};

import { ListItemButton, styled } from "@mui/material";
import color from "../../styles/_color.scss";

const ListButton = styled(ListItemButton)({
  "&.Mui-selected": {
    backgroundColor: color.primary,
    color: color.onPrimary,
    "&:hover": {
      backgroundColor: color.primary,
      color: color.onPrimary,
    },
  },
  "&:hover": {
    backgroundColor: color.primary,
    color: color.onPrimary,
  },
});

export default ListButton;

import { ListItemButton, styled } from "@mui/material";
import color from "../../styles/_color.scss";

const ListButton = styled(ListItemButton)({
  "&.Mui-selected": {
    backgroundColor: "transparent",
    color: color.primary,
    borderBottom: `.2vw solid ${color.primary}`,
    "&:hover": {
      backgroundColor: "transparent",
      color: color.primary,
    },
  },
  "&:hover": {
    backgroundColor: "transparent",
    color: "rgba(0, 0, 0, 0.7)",
  },
});

export default ListButton;

import { Button, styled } from "@mui/material";
import color from "../../styles/_color.scss";

const PrimaryButton = styled(Button)({
  textTransform: "none",
  textAlign: "center",
  backgroundColor: color.primary,
  color: color.onPrimary,
  border: "none",
  borderRadius: "2.2vw",
  fontFamily: `'Inter', sans-serif`,
  "&:hover": {
    backgroundColor: "rgba(54, 48, 38, 0.9)",
  },
});

export default PrimaryButton;

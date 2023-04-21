import { Button, styled } from "@mui/material";
import color from "../../styles/_color.scss";

const PrimaryButton = styled(Button)({
  textTransform: "none",
  textAlign: "center",
  backgroundColor: color.primary,
  color: color.onPrimary,
  padding: ".4rem 1.6rem",
  border: "none",
  borderRadius: ".4vw",
  fontFamily: `'Inter', sans-serif`,
  "&:hover": {
    backgroundColor: color.primaryHover,
    transform: "none",
  },
  "&:disabled": {
    backgroundColor: color.primaryDisabled,
  },
});

export default PrimaryButton;

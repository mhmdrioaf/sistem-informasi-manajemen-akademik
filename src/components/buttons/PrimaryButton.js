import { Button, styled } from "@mui/material";
import color from "../../styles/_color.scss";

const PrimaryButton = styled(Button)({
  textTransform: "none",
  textAlign: "center",
  backgroundColor: color.primary,
  color: color.onPrimary,
  padding: ".8rem",
  border: "none",
  borderRadius: ".4vw",
  fontFamily: `'Inter', sans-serif`,
  "&:hover": {
    backgroundColor: "rgba(61, 152, 70, 0.9)",
  },
  "&:disabled": {
    backgroundColor: "rgba(61, 152, 70, 0.5)",
  },
});

export default PrimaryButton;

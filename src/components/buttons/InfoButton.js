import { Button, styled } from "@mui/material";
import color from "../../styles/_color.scss";

const InfoButton = styled(Button)({
    textTransform: "none",
    textAlign: "center",
    backgroundColor: color.tertiary,
    color: color.onTertiary,
    padding: ".8rem",
    border: "none",
    borderRadius: ".4vw",
    fontFamily: `'Inter', sans-serif`,
    "&:hover": {
        backgroundColor: color.tertiaryHover,
    },
    "&:disabled": {
        backgroundColor: color.tertiaryDisabled,
    },
});

export default InfoButton;
import { Button, styled } from "@mui/material";
import color from "../../styles/_color.scss";

const InfoButton = styled(Button)({
    textTransform: "none",
    textAlign: "center",
    backgroundColor: "#5884cc",
    color: color.onPrimary,
    padding: ".8rem",
    border: "none",
    borderRadius: ".4vw",
    fontFamily: `'Inter', sans-serif`,
    "&:hover": {
        backgroundColor: "rgba(88, 132, 204, 0.9)",
    },
    "&:disabled": {
        backgroundColor: "rgba(88, 132, 204, 0.5)",
    },
});

export default InfoButton;
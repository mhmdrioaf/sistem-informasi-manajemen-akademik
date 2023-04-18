import { Button, styled } from "@mui/material";
import color from "../../styles/_color.scss";

const DangerButton = styled(Button)({
    textTransform: "none",
    textAlign: "center",
    backgroundColor: "#691e28",
    color: color.onPrimary,
    padding: ".8rem",
    border: "none",
    borderRadius: ".4vw",
    fontFamily: `'Inter', sans-serif`,
    "&:hover": {
        backgroundColor: "rgba(105, 30, 40, 0.9)",
    },
    "&:disabled": {
        backgroundColor: "rgba(105, 30, 40, 0.5)",
    },
});

export default DangerButton;
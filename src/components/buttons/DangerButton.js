import { Button, styled } from "@mui/material";
import color from "../../styles/_color.scss";

const DangerButton = styled(Button)({
    textTransform: "none",
    textAlign: "center",
    backgroundColor: color.error,
    color: color.onError,
    padding: ".8rem",
    border: "none",
    borderRadius: ".4vw",
    fontFamily: `'Inter', sans-serif`,
    "&:hover": {
        backgroundColor: color.errorHover,
    },
    "&:disabled": {
        backgroundColor: color.errorDisabled,
    },
});

export default DangerButton;
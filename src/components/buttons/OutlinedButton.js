import { Button, styled } from '@mui/material';
import color from '../../styles/_color.scss';

const OutlinedButton = styled(Button)({
    textTransform: "none",
    textAlign: "center",
    backgroundColor: color.backgroundColor,
    border: `.2vw solid ${color.primary}`,
    color: color.primary,
    borderRadius: ".4vw",
    padding: ".4vw 1.6vw",
    "&:hover": {
        backgroundColor: color.primary,
        color: color.onPrimary,
    }
})

export default OutlinedButton;
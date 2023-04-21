import { ListItemButton, styled } from "@mui/material";
import color from "../../styles/_color.scss";

const MarketplaceListButton = styled(ListItemButton)({
    backgroundColor: color.surfaceVariant,
    color: color.onSurfaceVariant,
    "&.Mui-selected": {
        backgroundColor: color.primaryContainer,
        color: color.onPrimaryContainer,
    },
});

export default MarketplaceListButton;
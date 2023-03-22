import styled from "@emotion/styled";
import color from "../../styles/_color.scss";
import { CircularProgress, Box } from "@mui/material";

const PrimaryLoading = styled(CircularProgress)({
  color: color.primary,
});

function FullPageLoading() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color.surface,
      }}
    >
      <PrimaryLoading />
    </Box>
  );
}

export default FullPageLoading;

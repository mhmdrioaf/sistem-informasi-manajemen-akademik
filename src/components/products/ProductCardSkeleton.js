import { Box, Skeleton } from "@mui/material";
import React from "react";

function ProductCardSkeleton() {
  return (
    <Skeleton variant="rectangular">
      <Box
        sx={{
          width: {
            xs: 160,
            sm: 160,
            md: 320,
            lg: 320,
          },
          height: {
            xs: 224,
            sm: 224,
            md: 448,
            lg: 448,
          },
          borderRadius: "6%",
        }}
      />
    </Skeleton>
  );
}

export default ProductCardSkeleton;

import { ReactNode } from "react";
import { Box, Paper } from "@mui/material";

export const Section = ({ children }: { children: ReactNode }) => {
  return (
    <Box mt={2}>
      <Paper elevation={3}>
        <Box alignItems={"center"} p={2}>
          {children}
        </Box>
      </Paper>
    </Box>
  );
};

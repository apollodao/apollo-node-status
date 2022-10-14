import { useState, ReactNode } from "react";
import { Box, Button, Stack } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";

export const InfoItem = ({
  label,
  content,
  link = false,
}: {
  label: string;
  content: string | undefined;
  link?: boolean;
}) => {
  const [copyContents, setCopyContents] = useState<ReactNode>(
    <ContentCopyIcon />
  );

  const animateCopyButton = () => {
    setCopyContents(<DoneIcon />);
    setTimeout(() => {
      setCopyContents(<ContentCopyIcon />);
    }, 1000);
  };

  return (
    <Box pt={1} display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <span style={{ fontWeight: 600, paddingRight: 6 }}>{label}: </span>
      {link ? (
        <Stack
          direction={{ xs: "column" }}
          spacing={1}
          alignItems={{ xs: "stretch" }}
        >
          <Button
            size={"small"}
            style={{
              wordBreak: "break-word",
              textAlign: "center",
              textTransform: "inherit",
            }}
            variant={"outlined"}
            href={content || ""}
            target={"_blank"}
            rel={"noreferrer"}
          >
            {content}
          </Button>
          <Button
            size={"small"}
            variant={"outlined"}
            onClick={() => {
              navigator.clipboard.writeText(content || "");
              animateCopyButton();
            }}
          >
            {copyContents}
          </Button>
        </Stack>
      ) : (
        <>{content}</>
      )}
    </Box>
  );
};

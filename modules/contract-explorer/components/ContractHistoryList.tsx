import dynamic from "next/dynamic";
import {
  Box,
  Grid,
  Card,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ContractCodeHistoryEntry } from "@cosmjs/cosmwasm-stargate";

export const ContractHistoryList = ({
  contractHistory,
}: {
  contractHistory: readonly ContractCodeHistoryEntry[];
}) => {
  const JsonRenderer = dynamic(() => import("./JsonRenderer"), {
    ssr: false,
  });

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box maxHeight={400} overflow={"scroll"}>
          {contractHistory.map((hi, i) => {
            return (
              <Accordion key={`historyItem-${i}`}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Box>{hi.operation}</Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Card
                    variant={"outlined"}
                    style={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <List>
                      <ListItem>
                        <ListItemText
                          primary={hi.codeId}
                          secondary={"CodeID"}
                        />
                      </ListItem>
                    </List>
                    <JsonRenderer content={hi.msg} theme={"twilight"} />
                  </Card>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      </Grid>
    </Grid>
  );
};

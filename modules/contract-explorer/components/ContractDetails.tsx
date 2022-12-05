import {
  Box,
  Grid,
  Card,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { Contract } from "@cosmjs/cosmwasm-stargate";

export const ContractDetails = ({
  contractInfo,
}: {
  contractInfo: Contract;
}) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Card
          variant={"outlined"}
          style={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <List>
            {Object.entries(contractInfo).map(([key, value], i) => {
              return (
                <ListItem key={`contractInfoItem-${i}`} dense={true}>
                  <ListItemText secondary={key} primary={value} />
                  <Divider variant={"fullWidth"} />
                </ListItem>
              );
            })}
          </List>
        </Card>
      </Grid>
    </Grid>
  );
};

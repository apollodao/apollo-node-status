import { useState } from "react";
import dynamic from "next/dynamic";
import {
  Box,
  Button,
  OutlinedInput,
  FormControl,
  InputLabel,
  Grid,
  ButtonGroup,
} from "@mui/material";
import { Section } from "modules/common/components";
import { JsonObject } from "@cosmjs/cosmwasm-stargate";

export const QueryBox = ({
  queryHandler,
  queryList,
}: {
  queryHandler: (query: JsonObject) => JsonObject;
  queryList: string[];
}) => {
  const [textValue, setTextValue] = useState<string>("{}");
  const [queryResponse, setQueryResponse] = useState<JsonObject>();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value);
  };

  const JsonRenderer = dynamic(() => import("./JsonRenderer"), {
    ssr: false,
  });

  const buttons = queryList.map((q, i) => {
    return (
      <Button
        key={`query-button-${i}`}
        onClick={() => {
          setTextValue(`{"${q}": {}}`);
        }}
      >
        {q}
      </Button>
    );
  });

  return (
    <Section>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box fontWeight={"bolder"} fontSize={16} mb={2}>
            Random Query
          </Box>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
            <FormControl fullWidth>
              <InputLabel htmlFor="component-outlined">
                Query Message
              </InputLabel>
              <OutlinedInput
                multiline={true}
                id="component-outlined"
                value={textValue}
                label="Query Message"
                minRows={4}
                onChange={handleChange}
              />
            </FormControl>

            <Button
              onClick={async () => {
                const query = JSON.parse(textValue || "{}");
                try {
                  const response = await queryHandler(query);
                  setQueryResponse(response);
                } catch (error) {
                  console.log("error", error);
                }
              }}
            >
              Run Query
            </Button>
          </Grid>
          <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
            <ButtonGroup
              orientation="vertical"
              aria-label="vertical contained button group"
              variant="outlined"
            >
              {buttons}
            </ButtonGroup>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {queryResponse !== undefined && (
            <Box mt={6} mb={6}>
              <JsonRenderer content={queryResponse} theme={"twilight"} />
            </Box>
          )}
        </Grid>
      </Grid>
    </Section>
  );
};

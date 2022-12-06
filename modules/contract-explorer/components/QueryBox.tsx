import { useState } from "react";
import dynamic from "next/dynamic";
import {
  Box,
  Button,
  OutlinedInput,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Section } from "modules/common/components";
import { JsonObject } from "@cosmjs/cosmwasm-stargate";

export const QueryBox = ({
  queryHandler,
}: {
  queryHandler: (query: JsonObject) => JsonObject;
}) => {
  const [textValue, setTextValue] = useState<string>(
    '{"vault_extension":{"apollo":{"state":{}}}}'
  );
  const [queryResponse, setQueryResponse] = useState<JsonObject>();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value);
  };

  const JsonRenderer = dynamic(() => import("./JsonRenderer"), {
    ssr: false,
  });

  return (
    <Section>
      <Box fontWeight={"bolder"} fontSize={16} mb={2}>
        Random Query
      </Box>
      <FormControl fullWidth>
        <InputLabel htmlFor="component-outlined">Query Message</InputLabel>
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
      {queryResponse !== undefined && (
        <Box mt={6} mb={6}>
          <JsonRenderer content={queryResponse} theme={"twilight"} />
        </Box>
      )}
    </Section>
  );
};

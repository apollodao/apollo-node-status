import { useState } from "react";
import {
  Stack,
  FormControl,
  Button,
  OutlinedInput,
  InputLabel,
} from "@mui/material";

export const ContractField = ({
  defaultValue,
  onChange,
}: {
  defaultValue: string;
  onChange: (c: string) => void;
}) => {
  const [contractAddress, setContractAddress] = useState<string>(defaultValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContractAddress(event.target.value);
  };

  return (
    <Stack flexDirection={"column"} spacing={2}>
      <FormControl fullWidth>
        <InputLabel htmlFor="component-outlined">Contract Address</InputLabel>
        <OutlinedInput
          id="component-outlined"
          value={contractAddress}
          label="Contract Address"
          onChange={handleChange}
        />
      </FormControl>
      <Button
        variant="outlined"
        onClick={() => onChange(contractAddress || "")}
      >
        Set Contract Address
      </Button>
    </Stack>
  );
};

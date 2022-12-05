import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import {
  supported_networks,
  SupportedNetwork,
} from "modules/common/config/networks";

export const NetworkDropdown = ({
  currentNetwork,
  onChange,
}: {
  currentNetwork: SupportedNetwork;
  onChange: (n: SelectChangeEvent) => void;
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Select Network</InputLabel>
      <Select
        labelId="select-network-label"
        id="select-network"
        value={currentNetwork}
        label="Select Network"
        onChange={onChange}
      >
        {supported_networks.map((n, i) => {
          return (
            <MenuItem key={`network-dropdown-${i}`} value={n}>
              {n}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

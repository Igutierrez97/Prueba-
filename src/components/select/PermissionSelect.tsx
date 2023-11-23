import { useContext, useState } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box } from "@mui/material";

import { FormContext } from "../../context/FormContext";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, permision: string, theme: Theme) {
  return {
    fontWeight:
      permision.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const PermissionSelect = ({
  permission,
  onChange,
}: {
  permission: string[];
  onChange: (selectedOption: string) => void;
}) => {
  const theme = useTheme();
  const { formFields } = useContext(FormContext);
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (
    event: SelectChangeEvent<typeof formFields.permision>
  ) => {
    const selectedOption = event.target.value as string;
    setSelectedOption(selectedOption);
    onChange(selectedOption); // Llama a la función onChange para pasar la opción seleccionada al componente padre
  };

  return (
    <Box sx={{ m: 1, width: "100%" }}>
      <InputLabel id="demo-multiple-name-label">Permission</InputLabel>
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        value={selectedOption}
        onChange={handleChange}
        input={<OutlinedInput label="Permision" />}
        MenuProps={MenuProps}
        sx={{ width: "100%" }}
      >
        {permission &&
          permission.map((perm) => (
            <MenuItem
              key={perm}
              value={perm}
              style={getStyles(perm, formFields.permision, theme)}
            >
              {perm}
            </MenuItem>
          ))}
      </Select>
    </Box>
  );
};

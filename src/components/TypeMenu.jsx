import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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

const types = [
  "amusement_park",
  "aquarium",
  "art_gallery",
  "bowling_alley",
  "cafe",
  "clothing_store",
  "convenience_store",
  "department_store",
  "embassy",
  "food",
  "landmark",
  "movie_theater",
  "museum",
  "park",
  "restaurant",
  "shopping_mall",
  "stadium",
  "store",
  "tourist_attraction",
  "zoo",
];

function getStyles(name, type, theme) {
  return {
    fontWeight:
      type.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function TypeMenu({ type, setType }) {
  const theme = useTheme();

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const formatType = (type) => {
    let formattedType = type;
    if (type.includes("_")) {
      formattedType = type.replace("_", " ");
    }
    return formattedType[0].toUpperCase() + formattedType.slice(1);
  };

  return (
    <div>
      <FormControl
        sx={{
          m: 1,
          minWidth: 100, // Change width to match button's size
          maxWidth: 150, // Adjust max-width if needed
        }}
      >
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={type}
          onChange={handleChange}
          input={
            <OutlinedInput
              label="Type"
              sx={{
                border: "none",
              }}
            />
          }
          MenuProps={MenuProps}
          sx={{
            width: "auto",
            height: "auto",
            padding: "0px",
            backgroundColor: "var(--secondary-color)",
            color: "var(--light-text-color)",
            borderRadius: "5px",
            border: "none",
            fontSize: "12px",
            fontWeight: "bold",
            textAlign: "center",
            cursor: "pointer",
            transition:
              "background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          }}
        >
          {types.map((type) => (
            <MenuItem
              key={type}
              value={type}
              style={getStyles(type, type, theme)}
            >
              {formatType(type)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default TypeMenu;

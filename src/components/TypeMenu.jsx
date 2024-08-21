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

function TypeMenu ({type, setType}){
	const theme = useTheme();

	const handleChange = (event) => {
		console.log(event.target.value, "<<< event")
		setType(event.target.value)
    };
    
    const formatType = (type) => {
        let formattedType = type
        if (type.includes("_")) {
            formattedType = type.replace("_", " ")
        }
        return formattedType[0].toUpperCase() + formattedType.slice(1)
    }

	return (
		<div>
			<FormControl sx={{ m: 1, width: 300 }}>
				<InputLabel id="demo-multiple-name-label">Type</InputLabel>
				<Select
					labelId="demo-multiple-name-label"
					id="demo-multiple-name"
					value={type}
					onChange={handleChange}
					input={<OutlinedInput label="Type" />}
					MenuProps={MenuProps}>
                    {types.map((type) => (
						<MenuItem
							key={type}
							value={type}
							style={getStyles(type, type, theme)}>
							{formatType(type)}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}

export default TypeMenu

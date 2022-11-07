import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { pink } from "@mui/material/colors";

const label = { inputProps: { "aria-label": "Favourite Checkbox" } };

const FavouriteCheckbox = ({ favourite, setFavourite }) => {
    return (
        <div>
            <Checkbox
                {...label}
                icon={<FavoriteBorder aria-label="Favorite Border Icon" />}
                checkedIcon={<Favorite aria-label="Favorite Icon" />}
                sx={{
                    color: pink[800],
                    "&.Mui-checked": {
                        color: pink[600],
                    },
                }}
                onChange={() => setFavourite(!favourite)}
                checked={favourite}
                data-testid="checkbox"
            />
        </div>
    );
};
export default FavouriteCheckbox;

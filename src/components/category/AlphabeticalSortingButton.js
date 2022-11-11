import { useDispatch } from "react-redux";
import { sortAlphabetically } from "../../redux/memosSlice";
import SortByAlphaIconBorder from "@mui/icons-material/SortByAlpha";
import { IconButton } from "@mui/material";

const AlphabeticalSortingButton = ({ categoryId }) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(sortAlphabetically({ categoryId }));
    };

    return (
        <IconButton onClick={handleClick} aria-label="Sorting">
            <SortByAlphaIconBorder
                aria-label="SortByAlphaIcon"
                sx={{ color: "gray" }}
            />
        </IconButton>
    );
};

export default AlphabeticalSortingButton;

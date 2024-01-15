import {styled} from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import {Checkbox} from "@mui/material";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import Card from "@mui/material/Card";

export const StyledCard = styled(Card)(({}) => ({
    marginBottom: '40px',
    // Adding bottom shadow
    boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;',

    // Adding a subtle border
    border: '1px solid rgba(0, 0, 0, 0.1)',

    // Adding a subtle gradient background
    background: 'linear-gradient(to bottom, #fff, #f5f5f5)'
}));

export const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0
    }
}));

export const StyledCheckbox = styled(Checkbox)(({theme}) => ({
    color: 'white' // For example, set the default color to pink
}));


export const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    }
}));
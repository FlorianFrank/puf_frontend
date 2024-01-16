import {styled} from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import {Checkbox} from "@mui/material";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import Card from "@mui/material/Card";
import {makeStyles} from "@material-ui/core";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import Chip from "@mui/material/Chip";

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

export const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex', flexDirection: 'column', marginTop: '5%', marginLeft: '5%', width: '50%'
    }, formControl: {
        margin: theme.spacing(1), minWidth: 120
    }, button: {
        marginTop: theme.spacing(2), backgroundColor: '#0277BD', '&:hover': {
            backgroundColor: '#42A5F5'
        }
    }
}));

export const useStylesResult = makeStyles((theme) => ({
    completed: {
        backgroundColor: '#c8e6c9' // Green background for completed tasks
    },
    inProgress: {
        backgroundColor: '#fff' // White background for tasks in progress
    },
    resultButton: {
        marginLeft: theme.spacing(2) // Add some spacing between cells
    },
    tableRow: {
        '&:not(:last-child)': {
            marginBottom: theme.spacing(1) // Add margin-bottom to all rows except the last one
        }
    }
}));

export const useStylesLogin = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

export const getStatusChipColor = (status) => {
    switch (status) {
        case 'finished':
            return {background: '#4caf50', color: '#ffffff'}; // Green background, white text
        case 'running':
            return {background: '#ffc107', color: '#000000'}; // Yellow background, black text
        case 'failed':
            return {background: '#f44336', color: '#ffffff'}; // Red background, white text
        default:
            return {background: '#ffffff', color: '#000000'}; // Default background and text color
    }
};
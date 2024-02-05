import React from "react";
import {
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell
} from "@material-ui/core";
import useStyles from "../components/style";

const states = {
    sent: "success",
    pending: "warning",
    declined: "secondary",
};

export default function TableComponent({data}) {
    const classes = useStyles();
    var keys = Object.keys(data[0]).map(i => i.toUpperCase());
    keys.shift(); // delete "id" key

    return (
        <Table className="mb-0">
            <TableHead>
                <TableRow>
                    {keys.map(key => (
                        <TableCell key={key}>{key}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map(({id, title, type, device, iteration, status}) => (
                    <TableRow key={id}>
                        <TableCell className="pl-3 fw-normal">{title}</TableCell>
                        <TableCell>{type}</TableCell>
                        <TableCell>{device}</TableCell>
                        <TableCell>{iteration}</TableCell>
                        <TableCell>{status}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

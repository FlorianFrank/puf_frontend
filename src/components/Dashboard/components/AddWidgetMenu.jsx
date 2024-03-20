import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import NestedMenuItem from 'material-ui-nested-menu-item';
import {Menu} from '@mui/material';

const widgetRows = [0, 1, 2]
const widgetColumns = [1, 2, 3, 4, 5, 6]

const widgetTitles = [
    'Performance Widget',
    'Server Info Widget',
    'Logging Widget',
    'Test Execution Table Widget',
    'Devices Widget',
    'Live Plot Widget'
];

export default function AddWidgetMenu({anchorEl, open, handleClose, addWidget}) {
    const addNestedItem = (title) => {
        return (
            <NestedMenuItem label={title} parentMenuOpen={true} onClick={() => {
            }}>
                {widgetRows.map((row) => (
                    <NestedMenuItem label={`Row ${row + 1}`} parentMenuOpen={true} onClick={() => {
                    }}>
                        {widgetColumns.map((colspan) => (
                            <MenuItem key={colspan} onClick={() => addWidget(title, row, colspan)}>
                                {`Colspan ${colspan}`}
                            </MenuItem>
                        ))}
                    </NestedMenuItem>
                ))}
            </NestedMenuItem>
        );
    };

    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            {widgetTitles.map((title) => addNestedItem(title))}
        </Menu>
    );
}

import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Switcher = (props) => {
    const handleChange = (event) => {
        props.setItem(event.target.value);
    };

    return (
        <FormControl sx={{m: 1, minWidth: 60}} size="small">
            <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={props.currentItem}
                onChange={handleChange}
            >
                {props.items.map((l, index) => (<MenuItem key={index} value={l}>{l}</MenuItem>))}
            </Select>
        </FormControl>
    );
}

export default Switcher;
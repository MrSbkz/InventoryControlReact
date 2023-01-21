import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const UsersSelect = (props) => {
    return (
        <Autocomplete
            id="users-select"
            sx={{width: 200}}
            size="small"
            options={props.users}
            autoComplete={false}
            getOptionLabel={(option) => option.fullName}
            renderOption={(props, user) => (
                <Box
                    component="li"
                    sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}
                >
                    {user.fullName}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={props.localization.selectUser}
                    inputProps={{
                        ...params.inputProps,
                    }}
                />
            )}
        />
    );
}

export default UsersSelect;
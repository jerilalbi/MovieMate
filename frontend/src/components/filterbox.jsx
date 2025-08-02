import { Box } from '@mui/material'
import React from 'react'

function FilterBox(props) {
    return (
        <Box sx={{
            width: 'fit-content',
            borderRadius: '10px',
            bgcolor: 'grey.800',
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            padding: '10px',
            cursor: 'pointer',
        }}>
            {props.title}
        </Box>
    )
}

export default FilterBox
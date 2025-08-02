import { Box } from '@mui/material'
import React from 'react'

function FilterBox({ title, onClick, active }) {
    return (
        <Box
            onClick={onClick}
            sx={{
                width: 'fit-content',
                borderRadius: '10px',
                bgcolor: title === active ? 'primary.main' : 'grey',
                display: 'flex',
                alignItems: 'center',
                color: 'white',
                padding: '10px',
                cursor: 'pointer',
            }}>
            {title}
        </Box>
    )
}

export default FilterBox
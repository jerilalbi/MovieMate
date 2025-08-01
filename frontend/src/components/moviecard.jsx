import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React from 'react'

function MovieCard(props) {
    return (
        <Box sx={{
            width: '200px',
            height: '300px',
            borderRadius: '10px',
            position: 'relative',
            bgcolor: 'grey.800',
            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent), url('${props.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            flexShrink: 0,
        }}>
            <Typography sx={{
                position: 'absolute',
                bottom: '25px',
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'white',
                fontSize: '18px',
                fontWeight: '500',
                textAlign: 'center',
            }}>
                {props.title || 'Movie Title'}
            </Typography>
        </Box>
    )
}

export default MovieCard
import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

function MyMovieCard(props) {
    return (
        <Box
            // onClick={handleClick}
            sx={{
                width: '200px',
                height: '300px',
                borderRadius: '10px',
                position: 'relative',
                bgcolor: 'grey.800',
                backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent), url('https://image.tmdb.org/t/p/w440_and_h660_face/uPpmBjY3znUqGY8kYwI5xvOrSc0.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                flexShrink: 0,
                cursor: 'pointer',
            }}>
            <IconButton sx={{
                position: 'absolute',
                top: '10px',
                right: '10px',
            }}>
                <DeleteIcon sx={{ color: 'red', fontSize: '30px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.4)' }} />
            </IconButton>
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

export default MyMovieCard
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function MovieCard(props) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/movie-details', {
            state: props.movie
        });
    };

    return (
        <Box
            onClick={handleClick}
            sx={{
                width: '200px',
                height: '300px',
                borderRadius: '10px',
                position: 'relative',
                bgcolor: 'grey.800',
                backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent), url('https://media.themoviedb.org/t/p/w440_and_h660_face/${props.movie.posterImg}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                flexShrink: 0,
                cursor: 'pointer',
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
                {props.movie.title || 'Movie Title'}
            </Typography>
        </Box>
    )
}

export default MovieCard
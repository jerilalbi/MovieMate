import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function MovieCard(props) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/movie-details', {
            state: {
                movie: {
                    title: 'Premalu',
                    overview: 'A gripping tale of love and sacrifice.',
                    genre_ids: [28, 12],
                    backdrop_path: 'myEc374uFZlEvab1Y0to3EnkENN.jpg',
                    poster_path: 'uPpmBjY3znUqGY8kYwI5xvOrSc0.jpg',
                },
            }
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
                backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent), url('${props.image}')`,
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
                {props.title || 'Movie Title'}
            </Typography>
        </Box>
    )
}

export default MovieCard
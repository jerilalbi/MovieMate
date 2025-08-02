import { Box, Container, IconButton, Rating, TextField, Typography } from '@mui/material'
import React from 'react'
import Header from '../components/header'
import { imageBaseURL } from '../services/tmdbApi'
import { useLocation } from 'react-router-dom'
import { useGenres } from '../context/GenreContext'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from '@mui/icons-material/Edit';

function MovieDetails() {
    const location = useLocation();
    const movie = location.state?.movie || {};
    const { genreMap } = useGenres();

    return (
        <Container disableGutters maxWidth="false">
            <Header />
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignContent: 'space-between',
                    paddingX: "24px",
                    overflow: 'hidden',
                    alignItems: 'center',
                    color: 'white',
                    backgroundImage: `url('${imageBaseURL}/${movie.backdrop_path}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'background-image 0.8s ease-in-out',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        zIndex: 1,
                    },
                    '& > *': {
                        zIndex: 2,
                    },
                }}>
                <Box>
                    <Box sx={{
                        display: 'flex',
                    }}>
                        <Box sx={{ width: '700px' }}>
                            <Typography sx={{ fontSize: '70px', fontWeight: '900', lineHeight: '1' }}>{movie.title}</Typography>
                            <Typography sx={{ fontSize: '17px', fontWeight: '500', lineHeight: '1.2', color: 'white' }}>{movie.overview}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                    }}>
                        {movie.genre_ids.map((genreId) => (
                            <Box sx={{
                                display: 'flex',
                                height: '40px',
                                paddingX: '20px',
                                width: 'fit-content',
                                alignItems: 'center',
                                bgcolor: 'rgba(207, 207, 207, 0.5)',
                                borderRadius: '20px',
                                marginTop: '10px',
                                marginRight: '8px',
                            }}>
                                <Typography sx={{ color: 'black', fontSize: '15px', fontWeight: '600', padding: '6px 12px' }}>{genreMap[genreId]}</Typography>
                            </Box>
                        ))}
                        <Box sx={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '40px',
                            borderColor: 'white',
                            borderWidth: '2px',
                            borderStyle: 'solid',
                            marginLeft: '20px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: '10px',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 4, 4, 0.5)',
                            }
                        }}>
                            <FavoriteBorderIcon sx={{ color: 'white', fontSize: '20px', }} />
                        </Box>
                    </Box>
                    <Box sx={{
                        mt: '10px',
                        width: '400px',
                        bgcolor: 'rgba(240, 240, 240, 0.2)',
                        borderRadius: '10px',
                        padding: '10px',
                    }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box>
                                <Typography sx={{ fontSize: '20px', fontWeight: '900', color: 'white' }}>
                                    Your Review
                                </Typography>
                                <Rating
                                    readOnly
                                    name="movie-rating"
                                    value={4}
                                    sx={{
                                        mt: 2, color: 'white',
                                        '& .MuiRating-iconEmpty': {
                                            color: '#888888',
                                        },
                                    }}
                                    size="large"
                                />
                            </Box>
                            <IconButton>
                                <EditIcon sx={{ color: 'white', fontSize: '30px', marginLeft: 'auto' }} />
                            </IconButton>
                        </Box>
                        <TextField
                            multiline
                            rows={4}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{
                                mt: 3,
                                width: '80%',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'white',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'red',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'white',
                                    },
                                },
                                '& .MuiInputBase-input': {
                                    color: 'white',
                                    fontWeight: '600',
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'gray',
                                },
                                '& .MuiInputBase-input.Mui-disabled': {
                                    WebkitTextFillColor: '#000', // fixes text color for disabled mode if needed
                                },
                                input: { color: 'white', fontWeight: '600' }
                            }}
                            value={'good film romantic and comedy higly recommended'}
                        // onChange={(e) => setReviewText(e.target.value)}
                        />
                    </Box>
                </Box>
                <Box sx={{
                    height: '500px',
                    width: '350px',
                    bgcolor: 'grey.800',
                    borderRadius: '10px',
                    marginRight: '24px',
                    backgroundImage: `url('https://image.tmdb.org/t/p/w440_and_h660_face/${movie.poster_path}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                </Box>

            </Box>
        </Container>
    )
}

export default MovieDetails
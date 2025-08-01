import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import Skeleton from '@mui/material/Skeleton';
import { getTrendingMovies, imageBaseURL } from '../services/tmdbApi';
import { useGenres } from '../context/GenreContext';

function MovieCarousel() {

    // const [movies, setMovies] = useState([]);
    const { genreMap } = useGenres();

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                // const res = await getTrendingMovies();
                // setMovies(res.data.results);
            } catch (err) {
                console.error('Failed to fetch movies:', err);
            }
        };

        // fetchTrending();
    }, []);

    let movies = [{
        "adult": false,
        "backdrop_path": "/eU7IfdWq8KQy0oNd4kKXS0QUR08.jpg",
        "id": 1061474,
        "title": "Superman",
        "original_title": "Superman",
        "overview": "Superman, a journalist in Metropolis, embarks on a journey to reconcile his Kryptonian heritage with his human upbringing as Clark Kent.",
        "poster_path": "/ombsmhYUqR4qqOLOxAyr5V8hbyv.jpg",
        "media_type": "movie",
        "original_language": "en",
        "genre_ids": [878, 12, 28],
        "popularity": 264.3187,
        "release_date": "2025-07-09",
        "video": false,
        "vote_average": 7.424,
        "vote_count": 1321
    }]

    return (
        movies.length <= 0 ? (
            <Skeleton
                key={0}
                variant="rectangular"
                width={'100%'}
                height={'80vh'}
                sx={{ borderRadius: 2, bgcolor: 'grey.900' }}
            />
        ) : (
            <Swiper
                modules={[Navigation, Autoplay]}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                slidesPerView={1}
            >
                {movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <Box sx={{
                            position: 'relative',
                            height: "80vh",
                            display: "flex",
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
                            </Box>

                            <Box sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '100%',
                                height: "50px",
                                bgcolor: "red",
                                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent)'
                            }} />
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>
        )
    )
}

export default MovieCarousel
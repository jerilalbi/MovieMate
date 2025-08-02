import Container from '@mui/material/Container'
import Headers from '../components/header.jsx'
import MovieCarousel from '../components/moviecarousel.jsx'
import { Box } from '@mui/system'
import Typography from '@mui/material/Typography'
import MovieCard from '../components/moviecard.jsx'
import { useEffect, useState } from 'react'
import { getAllMovies } from '../services/movieApi.jsx'

function Home() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await getAllMovies();
                const wishlistMovies = res.data.filter((movie) => movie.status === "Wishlist");
                setMovies(wishlistMovies);
            } catch (err) {
                console.error('Failed to fetch movies:', err);
            }
        };
        fetchMovies();
    }, []);

    return (
        <Container disableGutters maxWidth="false">
            <Headers page="home" />
            <MovieCarousel />
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', marginTop: '40px', marginLeft: '24px' }}>
                Wishlist Movies
            </Typography>
            <Box sx={{
                paddingLeft: '24px',
                marginTop: '30px',
                marginBottom: '50px',
                display: 'flex',
                overflowX: 'auto',
                gap: '20px',
                whiteSpace: 'nowrap',
                '&::-webkit-scrollbar': {
                    display: 'none',
                },
                scrollbarWidth: 'none',
            }}>
                {
                    movies.map((movie) => (
                        <MovieCard movie={movie} image="https://media.themoviedb.org/t/p/w440_and_h660_face/4hveI7tEISN8KU60UFJw1JRYKvv.jpg" />
                    ))
                }

            </Box>
        </Container>
    )
}

export default Home
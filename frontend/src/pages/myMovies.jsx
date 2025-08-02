import { Box, Container, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../components/header'
import MyMovieCard from '../components/mymoviecard'
import FilterBox from '../components/filterbox'
import { getAllMovies } from '../services/movieApi'

function MyMovies() {
    const [movies, setMovies] = useState([]);
    const [genres, setGenre] = useState([]);
    const [status, setStatus] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedStatus, setSelectedStatus] = useState("");

    const filteredMovies = movies.filter((movie) => {
        const genreMatch = !selectedGenre || movie.genre
            .split(",")
            .map((g) => g.trim())
            .includes(selectedGenre);

        const statusMatch = !selectedStatus || movie.status === selectedStatus;

        return genreMatch && statusMatch;
    });

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await getAllMovies();
                setMovies(res.data);
            } catch (err) {
                console.error('Failed to fetch movies:', err);
            }
        };
        fetchMovies();
    }, []);

    useEffect(() => {
        const getUniqueGenres = (movies) => {
            const genreSet = new Set();
            const statusSet = new Set();

            movies.forEach((movie) => {
                const genres = movie.genre.split(",").map((g) => g.trim());
                statusSet.add(movie.status);
                genres.forEach((g) => genreSet.add(g));
            });
            setGenre(Array.from(genreSet))
            setStatus(Array.from(statusSet));
        };

        getUniqueGenres(movies)
    }, [movies])

    return (
        <Container>
            <Header page="my-movies" />
            <Typography variant="h4" sx={{ color: 'white', fontWeight: '700', marginTop: '100px', marginBottom: '10px' }}>My Movies</Typography>
            <FilterBox title={'All Movies'} onClick={() => { setSelectedGenre(''); setSelectedStatus('') }} />
            <Box sx={{ display: 'flex', gap: '10px', marginBottom: '20px', mt: '10px' }}>
                {
                    Array.isArray(genres) && genres.length > 0 && genres.map((title) => (
                        <Box key={title}>
                            <FilterBox title={title} onClick={() => { setSelectedGenre(title) }} active={selectedGenre} />
                        </Box>
                    ))
                }
            </Box>
            <Box sx={{ display: 'flex', gap: '10px', marginBottom: '20px', mt: '10px' }}>
                {
                    Array.isArray(status) && genres.length > 0 && status.map((title) => (
                        <Box key={title}>
                            <FilterBox title={title} onClick={() => { setSelectedStatus(title) }} active={selectedStatus} />
                        </Box>
                    ))
                }
            </Box>
            <Grid container spacing={2}>
                {
                    filteredMovies.map((movie, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <MyMovieCard movie={movie} />
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    )
}

export default MyMovies
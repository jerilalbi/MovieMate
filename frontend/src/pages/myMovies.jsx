import { Box, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import Header from '../components/header'
import MyMovieCard from '../components/mymoviecard'
import FilterBox from '../components/filterbox'

function MyMovies() {
    return (
        <Container>
            <Header page="my-movies" />
            <Typography variant="h4" sx={{ color: 'white', fontWeight: '700', marginTop: '100px', marginBottom: '10px' }}>My Movies</Typography>
            <Box sx={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <FilterBox title="Drama" />
                <FilterBox title="Action" />
                <FilterBox title="Comedy" />
            </Box>
            <Grid container spacing={2}>
                {[...Array(6)].map((_, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <MyMovieCard title={`Movie ${index + 1}`} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default MyMovies
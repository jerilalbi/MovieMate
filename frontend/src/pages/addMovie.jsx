import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import React from 'react'
import Header from '../components/header'
import SearchMovie from '../components/searchMovie'

function AddMovie() {
    return (
        <Container>
            <Header page="add-movie" />
            <Typography variant="h4" sx={{ color: 'white', fontWeight: '700', marginTop: '100px' }}>Add Movies</Typography>
            <SearchMovie />
        </Container>
    )
}

export default AddMovie
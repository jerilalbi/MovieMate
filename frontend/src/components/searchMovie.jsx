import React, { useState, useCallback } from 'react';
import { TextField, Box, List, ListItem, ListItemText, CircularProgress, Button } from '@mui/material';
import { searchMovie } from '../services/tmdbApi';
import SearchIcon from '@mui/icons-material/Search';

function SearchMovie() {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [director, setDirector] = useState('');

    const handleSearch = async () => {
        if (!query.trim()) return;

        try {
            setLoading(true);
            const res = await searchMovie(query);
            setResults(res.data.results || []);
        } catch (err) {
            console.error('Error fetching movies:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectMovie = (movie) => {
        setSelectedMovie(movie);
        setResults([]);
        setDirector(movie.id);
        setQuery(movie.title);
    };

    return (
        <Box sx={{ width: '100%', mt: 4, bgcolor: 'blue' }}>
            <Box sx={{
                width: '50%',
                display: 'flex',

            }}>
                <TextField
                    sx={{
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
                        '& .MuiInputLabel-root': {
                            color: 'gray',
                        },
                        input: { color: 'white', fontWeight: '600' }
                    }}
                    label="Search Movies"
                    variant="outlined"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Box
                    sx={{
                        width: '10%',
                        height: 'auto',
                        bgcolor: 'primary.main',
                        marginLeft: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px',
                        cursor: 'pointer',
                    }}
                    onClick={handleSearch}
                    disabled={loading}
                >
                    <SearchIcon sx={{ color: 'white', fontSize: '30px' }} />
                </Box>
            </Box>

            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <CircularProgress size={24} />
                </Box>
            )}

            {results.length > 0 && (
                <List sx={{ mt: 1, bgcolor: '#f9f9f9', borderRadius: 1, overflowY: 'auto', maxHeight: '300px', width: '50%' }}>
                    {results.slice(0, 5).map((movie) => (
                        <ListItem
                            sx={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}
                            button
                            key={movie.id}
                            onClick={() => handleSelectMovie(movie)}
                        >
                            <Box>
                                <ListItemText primary={movie.title} />
                                <ListItemText primary={movie.release_date} />
                            </Box>
                            <Box sx={{
                                height: '100px',
                                width: '60px',
                                backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }} />
                        </ListItem>
                    ))}
                </List>
            )}

            {selectedMovie && (
                <Box sx={{ mt: 3 }}>
                    <TextField
                        label="Director Name"
                        placeholder="Enter manually"
                        fullWidth
                        value={director}
                        onChange={(e) => setDirector(e.target.value)}
                    />
                </Box>
            )}


        </Box>
    )
}

export default SearchMovie
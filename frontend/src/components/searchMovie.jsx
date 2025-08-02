import React, { useState, useCallback, useRef, useEffect } from 'react';
import { TextField, Box, List, ListItem, ListItemText, CircularProgress, MenuItem, FormControl, InputLabel, Select, Typography, Rating } from '@mui/material';
import { getDirectorName, getStreamingServices, searchMovie } from '../services/tmdbApi';
import SearchIcon from '@mui/icons-material/Search';
import { useGenres } from '../context/GenreContext';
import { addMovietoDB } from '../services/movieApi';

function SearchMovie() {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [director, setDirector] = useState('');
    const [genre, setGenre] = useState('');
    const [platform, setPlatform] = useState('');
    const [seasonCompleted, setSeasonCompleted] = useState('');
    const [episodeCompleted, setEpisodeCompleted] = useState('');
    const [mediaType, setMediaType] = useState('movie');
    const containerRef = useRef();
    const { genreMap } = useGenres();
    const [selectedStatus, setSelectedStatus] = useState('');
    const [completedDate, setCompletedDate] = useState('');
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');

    const handleSearch = async () => {
        if (!query.trim()) return;

        try {
            setLoading(true);
            const res = await searchMovie(query);
            setResults(res.data.results.filter(item => item.media_type === 'movie' || item.media_type === 'tv'));
        } catch (err) {
            console.error('Error fetching movies:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectMovie = async (movie) => {
        const directorName = await getDirectorName(movie.id, movie.media_type);
        const providerName = await getStreamingServices(movie.id, movie.media_type);
        setSelectedMovie(movie);
        setMediaType(movie.media_type);
        setResults([]);
        setDirector(directorName);
        setPlatform(providerName);
        setQuery(movie.media_type === 'tv' ? movie.name : movie.title);
        setGenre(movie.genre_ids.map(id => genreMap[id]).join(', '));
    };

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const handleCompletedDate = (event) => {
        setCompletedDate(event.target.value);
    }

    const addMovie = async () => {
        const finalData = {
            title: query,
            overview: selectedMovie.overview,
            director: director,
            media_type: mediaType,
            genre: genre,
            rating: rating,
            review: reviewText,
            completed_date: completedDate === "" ? null : completedDate,
            completedSeason: seasonCompleted,
            completedEpisode: episodeCompleted,
            status: selectedStatus,
            bgImg: selectedMovie.backdrop_path || "",
            posterImg: selectedMovie.poster_path || ""
        }
        console.log(finalData);
        const isDataAdded = await addMovietoDB(finalData);
        if (isDataAdded) {
            setSelectedMovie(null);
            setMediaType('movie');
            setResults([]);
            setDirector('');
            setPlatform('');
            setQuery('');
            setGenre('');
            setSelectedStatus('');
            setCompletedDate('');
            setRating(0);
            setReviewText('');
            setSelectedStatus('');
            setCompletedDate('');
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setResults([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <Box sx={{ display: 'flex', width: '100%', mt: 4 }}>
            <Box sx={{ width: '50%' }}>
                <Box
                    ref={containerRef}
                    sx={{
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
                    <List
                        ref={containerRef}
                        sx={{ position: 'absolute', zIndex: 10, mt: 1, bgcolor: '#f9f9f9', borderRadius: 1, overflowY: 'auto', maxHeight: '300px', width: '50%' }}>
                        {results.slice(0, 5).map((movie) => (
                            <ListItem
                                sx={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}
                                button
                                key={movie.id}
                                onClick={() => handleSelectMovie(movie)}
                            >
                                <Box>
                                    <ListItemText primary={movie.media_type === 'tv' ? movie.name : movie.title} />
                                    <ListItemText primary={movie.media_type === 'tv' ? movie.first_air_date : movie.release_date} />
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

                <Box sx={{ mt: 3 }}>
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
                        label="Director Name"
                        placeholder="Enter manually"
                        value={director}
                        onChange={(e) => setDirector(e.target.value)}
                    />
                </Box>
                <Box sx={{ mt: 3 }}>
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
                        label="Genre"
                        placeholder="Enter manually"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />
                </Box>
                <Box sx={{ mt: 3 }}>
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
                        label="Watch On"
                        placeholder="Enter manually"
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                    />
                </Box>
                <Box sx={{ mt: 3 }}>
                    <FormControl sx={{ width: '80%', color: 'white' }} variant="outlined">
                        <InputLabel sx={{ color: 'grey' }} id="genre-label">Status</InputLabel>
                        <Select
                            sx={{
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                                '.MuiSvgIcon-root': {
                                    color: 'white',
                                },
                                '& .MuiSelect-select': {
                                    color: 'white',
                                    fontWeight: 'bold',
                                },
                            }}
                            labelId="genre-label"
                            id="genre-select"
                            value={selectedStatus}
                            label="Status"
                            onChange={handleStatusChange}
                        >
                            <MenuItem value="Watching">Watching</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                            <MenuItem value="Wishlist">Wishlist</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                {selectedStatus === 'Completed' &&
                    (
                        <Box sx={{ mt: 3 }}>
                            <TextField
                                sx={{
                                    width: '80%',
                                    '& label': {
                                        color: 'white',
                                    },
                                    '& label.Mui-focused': {
                                        color: 'white',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        color: 'white',
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
                                    '& input[type="date"]::-webkit-calendar-picker-indicator': {
                                        filter: 'invert(1)',
                                    },
                                }}
                                label="Completed Date"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={completedDate}
                                onChange={handleCompletedDate}
                            />
                        </Box>
                    )
                }
                {
                    (mediaType === 'tv' && selectedStatus === 'Watching') && (
                        <>
                            <Box sx={{ mt: 3 }}>
                                <TextField
                                    type='number'
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
                                    label="Season Completed"
                                    placeholder="Enter manually"
                                    value={seasonCompleted}
                                    onChange={(e) => setSeasonCompleted(e.target.value)}
                                />
                            </Box>
                            <Box sx={{ mt: 3 }}>
                                <TextField
                                    type='number'
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
                                    label="Episode Completed"
                                    placeholder="Enter manually"
                                    value={episodeCompleted}
                                    onChange={(e) => setEpisodeCompleted(e.target.value)}
                                />
                            </Box>
                        </>

                    )
                }
                {selectedStatus === 'Completed' && (
                    <>
                        <Typography sx={{ color: 'white', fontWeight: 'bold', mt: 3 }}>
                            Add Review
                        </Typography>
                        <Rating
                            name="movie-rating"
                            value={rating}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                            sx={{
                                mt: 2, color: 'white',
                                '& .MuiRating-iconEmpty': {
                                    color: '#888888',
                                },
                            }}
                            size="large"
                        />
                        <TextField
                            label="Write your review"
                            multiline
                            rows={4}
                            fullWidth
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
                                '& .MuiInputLabel-root': {
                                    color: 'gray',
                                },
                                '& .MuiInputBase-input': {
                                    color: 'white',
                                    fontWeight: '600',
                                },
                                input: { color: 'white', fontWeight: '600' }
                            }}
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                        />
                    </>
                )}
                <Box
                    onClick={addMovie}
                    sx={{
                        mt: 3,
                        bgcolor: 'primary.main',
                        width: '80%',
                        padding: '10px',
                        textAlign: 'center',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        boxSizing: 'border-box',
                        marginBottom: '20px',
                    }}>
                    <Typography sx={{ color: 'white', fontWeight: 'bold' }}>Add Movie</Typography>
                </Box>
            </Box>
            <Box sx={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box
                    sx={{
                        width: '50%',
                        height: '70%',
                        bgcolor: 'grey',
                        backgroundImage: selectedMovie && `url(https://image.tmdb.org/t/p/w500${selectedMovie.poster_path})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '10px',
                    }}>
                    {!selectedMovie?.poster_path && (
                        <Typography sx={{ color: 'white', textAlign: 'center', marginTop: '150px' }}>No Image Available</Typography>
                    )}
                </Box>
            </Box>


        </Box>
    )
}

export default SearchMovie
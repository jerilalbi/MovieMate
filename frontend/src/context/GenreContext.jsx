import React, { createContext, useState, useEffect, useContext } from 'react';
import { getGenreList } from '../services/tmdbApi';

const GenreContext = createContext();

export const GenreProvider = ({ children }) => {
    const [genreMap, setGenreMap] = useState({});

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const res = await getGenreList();
                const map = {};
                res.data.genres.forEach((g) => {
                    map[g.id] = g.name;
                });
                setGenreMap(map);
            } catch (err) {
                console.error('Failed to fetch genres', err);
            }
        };

        fetchGenres();
    }, []);

    return (
        <GenreContext.Provider value={{ genreMap }}>
            {children}
        </GenreContext.Provider>
    );
};

export const useGenres = () => useContext(GenreContext);

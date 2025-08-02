import axios from 'axios';

export const addMovie = async (data) => {
    try {
        await axios.post('http://localhost:8000/media', {
            data,
            // rating: parseInt(formData.rating),
        });
        alert('Movie added!');
    } catch (e) {
        console.error('Error adding movie:', err);
    }
} 
import axios from 'axios';

export const addMovietoDB = async (data) => {
    try {
        await axios.post('http://localhost:8000/media', {
            ...data,
            // rating: parseInt(formData.rating),
        });
        alert('Movie added!');
        return true;
    } catch (e) {
        console.error('Error adding movie:', e);
        return false;
    }
}

export const getAllMovies = async () => axios.get(`http://localhost:8000/media`)

export const deleteMovieDb = async (id) => {
    try {
        const res = await axios.delete(`http://localhost:8000/media/${id}`);
        console.log(res.data.detail);
    } catch (error) {
        console.error('Error deleting movie:', error.response?.data?.detail || error.message);
    }
};
import { GenreProvider } from './context/GenreContext';
import AddMovie from './pages/addMovie';
import Home from './pages/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieDetails from './pages/movieDetails';
import MyMovies from './pages/myMovies';


function App() {
  return (
    <GenreProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-movie" element={<AddMovie />} />
          <Route path="/movie-details" element={<MovieDetails />} />
          <Route path="/my-movies" element={<MyMovies />} />
        </Routes>
      </Router>
    </GenreProvider>
  );
}

export default App;

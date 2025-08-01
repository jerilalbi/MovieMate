import { GenreProvider } from './context/GenreContext';
import AddMovie from './pages/addMovie';
import Home from './pages/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <GenreProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-movie" element={<AddMovie />} />
        </Routes>
      </Router>
    </GenreProvider>
  );
}

export default App;

import { GenreProvider } from './context/GenreContext';
import Home from './pages/home';

function App() {
  return (
    <GenreProvider>
      <Home />
    </GenreProvider>
  );
}

export default App;

import Container from '@mui/material/Container'
import Headers from '../components/header.jsx'
import MovieCarousel from '../components/moviecarousel.jsx'
import { Box } from '@mui/system'
import Typography from '@mui/material/Typography'
import MovieCard from '../components/moviecard.jsx'

function Home() {
    return (
        <Container disableGutters maxWidth="false">
            <Headers />
            <MovieCarousel />
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', marginTop: '40px', marginLeft: '24px' }}>
                Recommended Movies
            </Typography>
            <Box sx={{
                paddingLeft: '24px',
                marginTop: '30px',
                display: 'flex',
                overflowX: 'auto',
                gap: '20px',
                whiteSpace: 'nowrap',
                '&::-webkit-scrollbar': {
                    display: 'none',
                },
                scrollbarWidth: 'none',
            }}>
                <MovieCard title="Super Man" image="https://media.themoviedb.org/t/p/w440_and_h660_face/4hveI7tEISN8KU60UFJw1JRYKvv.jpg" />
                <MovieCard title="Super Man" image="https://media.themoviedb.org/t/p/w440_and_h660_face/4hveI7tEISN8KU60UFJw1JRYKvv.jpg" />
                <MovieCard title="Super Man" image="https://media.themoviedb.org/t/p/w440_and_h660_face/4hveI7tEISN8KU60UFJw1JRYKvv.jpg" />
                <MovieCard title="Super Man" image="https://media.themoviedb.org/t/p/w440_and_h660_face/4hveI7tEISN8KU60UFJw1JRYKvv.jpg" />
                <MovieCard title="Super Man" image="https://media.themoviedb.org/t/p/w440_and_h660_face/4hveI7tEISN8KU60UFJw1JRYKvv.jpg" />
            </Box>
        </Container>
    )
}

export default Home
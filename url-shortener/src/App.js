import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import StatsPage from './pages/StatsPage';
import RedirectPage from './pages/RedirectPage';
import { Button, Box } from '@mui/material';

function App() {
  return (
    <Router>
      <Box sx={{ p: 2 }}>
        {/* Global navigation button */}
        <Link to="/stats" style={{ textDecoration: 'none' }}>
          <Button variant="outlined">View Statistics</Button>
        </Link>
      </Box>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/:shortcode" element={<RedirectPage />} />
      </Routes>
    </Router>
  );
}

export default App;

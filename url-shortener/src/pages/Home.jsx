import { Container, Typography } from '@mui/material';
import UrlShortenerForm from '../components/UrlShortenerForm';
import UrlList from '../components/UrlList';

const Home = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      <UrlShortenerForm />
      <UrlList />
    </Container>
  );
};

export default Home;

import { Container, Typography } from '@mui/material';
import StatsTable from '../components/StatsTable';

const Stats = () => (
  <Container>
    <Typography variant="h4" gutterBottom>URL Statistics</Typography>
    <StatsTable />
  </Container>
);

export default Stats;

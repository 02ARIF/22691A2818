import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Card, CardContent, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';

const StatsTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const urlMap = JSON.parse(localStorage.getItem('urlMap') || '{}');
    const clickLogs = JSON.parse(localStorage.getItem('clickLogs') || '{}');

    const stats = Object.keys(urlMap).map((shortcode) => ({
      shortcode,
      longUrl: urlMap[shortcode],
      clicks: clickLogs[shortcode]?.length || 0,
      logs: clickLogs[shortcode] || []
    }));

    setData(stats);
  }, []);

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>URL Statistics</Typography>
      {data.map((item, idx) => (
        <Card key={idx} sx={{ mt: 2 }}>
          <CardContent>
            <Typography><strong>Short URL:</strong> http://localhost:3000/{item.shortcode}</Typography>
            <Typography><strong>Original:</strong> {item.longUrl}</Typography>
            <Typography><strong>Total Clicks:</strong> {item.clicks}</Typography>

            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Timestamp</strong></TableCell>
                    <TableCell><strong>Source</strong></TableCell>
                    <TableCell><strong>Location</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {item.logs.map((log, i) => (
                    <TableRow key={i}>
                      <TableCell>{log.timestamp}</TableCell>
                      <TableCell>{log.source}</TableCell>
                      <TableCell>{log.location}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default StatsTable;

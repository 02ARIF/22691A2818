import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';

const StatsPage = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const map = JSON.parse(localStorage.getItem('urlMap') || '{}');
    const logs = JSON.parse(localStorage.getItem('clickLogs') || '{}');

    const combined = Object.entries(map).map(([shortcode, longUrl]) => {
      const clicks = logs[shortcode] || [];
      return {
        shortcode,
        longUrl,
        clickCount: clicks.length,
        lastClicked: clicks.length > 0 ? clicks[clicks.length - 1].timestamp : 'Never',
        referrers: [...new Set(clicks.map((c) => c.referrer))],
      };
    });

    setStats(combined);
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        URL Statistics
      </Typography>
      {stats.length === 0 ? (
        <Typography>No URLs found.</Typography>
      ) : (
        stats.map((entry, index) => (
          <Paper key={index} sx={{ p: 2, mb: 2 }}>
            <Typography><strong>Original URL:</strong> {entry.longUrl}</Typography>
            <Typography><strong>Shortcode:</strong> {entry.shortcode}</Typography>
            <Typography><strong>Clicks:</strong> {entry.clickCount}</Typography>
            <Typography><strong>Last Clicked:</strong> {entry.lastClicked}</Typography>
            <Typography><strong>Referrers:</strong> {entry.referrers.join(', ')}</Typography>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default StatsPage;

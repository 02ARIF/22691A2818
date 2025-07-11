import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent
} from '@mui/material';

const UrlList = ({ urls }) => {
  if (!Array.isArray(urls)) {
    return (
      <Box mt={4}>
        <Typography variant="h6" color="error">
          Error: URL list is not available.
        </Typography>
      </Box>
    );
  }

  return (
    <Box mt={4}>
      <Typography variant="h6">Shortened URLs</Typography>
      {urls.length === 0 ? (
        <Typography>No URLs have been shortened yet.</Typography>
      ) : (
        urls.map((url, idx) => (
          <Card key={idx} sx={{ mt: 2 }}>
            <CardContent>
              <Typography>
                🔗 <strong>{url.shortUrl}</strong>
              </Typography>
              <Typography>Original: {url.longUrl}</Typography>
              <Typography>
                Expires in: {url.validity || 30} minutes
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default UrlList;

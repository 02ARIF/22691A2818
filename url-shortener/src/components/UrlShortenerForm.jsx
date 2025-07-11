import { logEvent } from '../utils/logger';
import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper
} from '@mui/material';
import UrlList from './UrlList'; 

const UrlShortenerForm = () => {
  const [urls, setUrls] = useState([
    { longUrl: '', validity: '', shortcode: '' }
  ]);
  const [shortenedUrls, setShortenedUrls] = useState([]);

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const addUrlField = () => {
    if (urls.length < 5) {
      setUrls([...urls, { longUrl: '', validity: '', shortcode: '' }]);
    }
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const processed = [];

    const existingMap = JSON.parse(localStorage.getItem('urlMap') || '{}');
    const shortcodeSet = new Set(Object.keys(existingMap));

    for (let url of urls) {
      if (!isValidUrl(url.longUrl)) {
        alert(`Invalid URL: ${url.longUrl}`);
        return;
      }

      let shortcode = url.shortcode || Math.random().toString(36).substring(2, 8);

      // Ensure uniqueness
      while (shortcodeSet.has(shortcode)) {
        shortcode = Math.random().toString(36).substring(2, 8);
      }
      shortcodeSet.add(shortcode);

      const validity = url.validity ? parseInt(url.validity) : 30; // default 30 mins
      const expiry = new Date(Date.now() + validity * 60000).toLocaleString();

      processed.push({
        longUrl: url.longUrl,
        shortcode,
        expiry
      });

      existingMap[shortcode] = url.longUrl;
    }

    localStorage.setItem('urlMap', JSON.stringify(existingMap));

    logEvent('submission', `Generated ${processed.length} short URLs`);
    setShortenedUrls(processed);
  };

  return (
    <>
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h6" gutterBottom>
          Shorten up to 5 URLs
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} columns={12}>
            {urls.map((url, index) => (
              <React.Fragment key={index}>
                <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
                  <TextField
                    fullWidth
                    required
                    label="Original Long URL"
                    value={url.longUrl}
                    onChange={(e) => handleChange(index, 'longUrl', e.target.value)}
                  />
                </Grid>
                <Grid sx={{ gridColumn: { xs: 'span 6', md: 'span 3' } }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Validity (mins)"
                    value={url.validity}
                    onChange={(e) => handleChange(index, 'validity', e.target.value)}
                  />
                </Grid>
                <Grid sx={{ gridColumn: { xs: 'span 6', md: 'span 3' } }}>
                  <TextField
                    fullWidth
                    label="Preferred Shortcode"
                    value={url.shortcode}
                    onChange={(e) => handleChange(index, 'shortcode', e.target.value)}
                  />
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
          <Box mt={2}>
            <Button
              variant="outlined"
              onClick={addUrlField}
              disabled={urls.length >= 5}
              sx={{ mr: 2 }}
            >
              + Add More
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Shorten URLs
            </Button>
          </Box>
        </form>
      </Paper>

      {/* Display Results */}
      {shortenedUrls.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Shortened URLs:
          </Typography>
          {shortenedUrls.map((url, index) => (
            <Paper key={index} elevation={2} sx={{ p: 2, mb: 1 }}>
              <Typography>
                <strong>Original:</strong> {url.longUrl}
              </Typography>
              <Typography>
                <strong>Short URL:</strong> http://localhost:3000/{url.shortcode}
              </Typography>
              <Typography>
                <strong>Expires at:</strong> {url.expiry}
              </Typography>
            </Paper>
          ))}
        </Box>
      )}
    </>
  );
};

export default UrlShortenerForm;

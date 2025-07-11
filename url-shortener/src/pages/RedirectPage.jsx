import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RedirectPage = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const urlMap = JSON.parse(localStorage.getItem('urlMap') || '{}');
    const destination = urlMap[shortcode];

    if (destination) {
      // Track click info
      const clickLogs = JSON.parse(localStorage.getItem('clickLogs') || '{}');
      const newLog = {
        timestamp: new Date().toLocaleString(),
        referrer: document.referrer || 'direct',
      };

      if (!clickLogs[shortcode]) {
        clickLogs[shortcode] = [];
      }
      clickLogs[shortcode].push(newLog);

      localStorage.setItem('clickLogs', JSON.stringify(clickLogs));

      // Redirect
      window.location.href = destination;
    } else {
      alert('Invalid or expired shortcode');
      navigate('/');
    }
  }, [shortcode, navigate]);

  return null;
};

export default RedirectPage;

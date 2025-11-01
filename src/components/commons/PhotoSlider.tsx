import React, { useEffect, useState } from 'react';
import { Box, Card, Button, Typography } from '@mui/joy';
import { ArrowRight, ArrowLeft } from '@mui/icons-material';
import { useAppContext } from 'AppContext';

export default function PhotoSlider() {
  const { companyData } = useAppContext();
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? companyData.slides.length - 1 : prevIndex - 1));
  };

  const next = () => {
    setIndex((prevIndex) => (prevIndex === companyData.slides.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
      const interval = setInterval(() => {
        next();
      }, 5000);
      return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ width: "100%", mx: 'auto', mt: 4, position: 'relative' }}>
      <Card sx={{ overflow: 'hidden', p: 0 }}>
        <img
          src={companyData.slides[index].image_url}
          alt={`Slide ${index + 1}`}
          style={{ width: '100%', height: 'auto', transition: 'opacity 0.5s ease-in-out' }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            transform: 'translateY(-50%)',
            px: 2,
          }}
        >
          <Button variant="soft" onClick={prev}>
            <ArrowLeft color="warning" />
          </Button>
          <Button variant="soft" onClick={next}>
            <ArrowRight color="warning" />
          </Button>
        </Box>
        <Typography level="body-sm" textAlign="center" mt={1}>
          {index + 1} / {companyData.slides.length}
        </Typography>
      </Card>
    </Box>
  );
}
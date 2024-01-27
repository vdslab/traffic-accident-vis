import { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';

function valueLabelFormat(value) {
  const date = new Date(value);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function AnimationController({ displayDate, setDisplayDate, animationPlayed, setAnimationPlayed, minDisplayDate, maxDisplayDate }) {
  const animationStep = 24 * 60 * 60 * 1000;

  useEffect(() => {
    if (animationPlayed) {
      const intervalId = setInterval(() => {
        setDisplayDate(prevDisplayDate => (((prevDisplayDate + animationStep) - minDisplayDate) % (maxDisplayDate - minDisplayDate) + minDisplayDate));
      }, 500);
      return () => clearInterval(intervalId);
    }
  }, [animationPlayed]);

  const marks = [
    { value: minDisplayDate, label: valueLabelFormat(minDisplayDate) },
    { value: maxDisplayDate, label: valueLabelFormat(maxDisplayDate) }
  ];

  const handleChange = (_, newValue) => {
    setDisplayDate(newValue);
  };

  const handleClick = () => {
    setAnimationPlayed(!animationPlayed);
    if (displayDate === maxDisplayDate) {
      setDisplayDate(minDisplayDate);
    }
  };

  return (
    <>
      <Slider
        value={displayDate}
        valueLabelFormat={valueLabelFormat}
        valueLabelDisplay="on"
        step={animationStep}
        marks={marks}
        min={minDisplayDate}
        max={maxDisplayDate}
        onChange={handleChange}
      />
      <IconButton
        aria-label={animationPlayed ? 'pause' : 'play'}
        onClick={handleClick}
        sx={{ bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' }, color: '#ffffff' }}
      >
        {
          animationPlayed ? (
            <PauseRounded sx={{ fontSize: '3rem' }} />
          ) : (
            <PlayArrowRounded sx={{ fontSize: '3rem' }} />
          )
        }
      </IconButton>
    </>
  );
}

export default AnimationController;
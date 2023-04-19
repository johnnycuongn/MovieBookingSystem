/* eslint-disable react/prop-types */
import { Grid } from '@mui/material';
import React from 'react';
import MovieCard from './MovieCard';

/**
 * @summary Displays the list of products passed down from the controller
 * @param {array} products The list of products to be displayed
 * @returns JSX.Element
 */
export function MoviesGridView({ movies }) {
  return (
    <Grid
      container
      sx={{
        backgroundColor: 'white'
      }}
      spacing={2}
      marginY={2}
    >
      {
      movies.map((movie) => (
        <Grid
          item
          key={movie.id}
          xs={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <MovieCard movie={movie} />
          <br />
        </Grid>
      ))
    }
    </Grid>
  );
}

export default MoviesGridView;

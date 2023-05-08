/* eslint-disable react/prop-types */
import { Grid } from '@mui/material';
import React from 'react';
import TicketCard from './TicketCard';

/**
 * @summary Displays the list of products passed down from the controller
 * @param {array} products The list of products to be displayed
 * @returns JSX.Element
 */
export function TicketsGridView({ tickets = [] }) {
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
      tickets && tickets.map((ticket) => (
        <Grid
          item
          key={ticket.id}
          xs={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <TicketCard ticket={ticket} />
          <br />
        </Grid>
      ))
    }
    </Grid>
  );
}

export default TicketsGridView;

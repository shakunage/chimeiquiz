import React from 'react';
import theme from '../theme';

import { Typography, ThemeProvider } from '@material-ui/core'
import { CircleOutlined, ClearOutlined } from '@mui/icons-material'

const Scores = (props) => {
    return (
      <div>
      <ThemeProvider theme={theme}>
      <Typography color='primary' display="inline">
      <CircleOutlined fontSize={'large'} /> {props.correctCount}
      </Typography>
      <Typography color='secondary' display="inline">
      <ClearOutlined fontSize={'large'} /> {props.wrongCount}
      </Typography>
      <p></p>
      </ThemeProvider>
      </div>
    )
  }

  export default Scores;
import React from 'react';
import theme from '../theme';

import { Typography, ThemeProvider} from '@material-ui/core'
import { CheckCircle, Cancel } from '@mui/icons-material'

const Scores = (props) => {
    return (
      <div>
      <ThemeProvider theme={theme}>
      <Typography color='primary'>
      <CheckCircle /> {props.correctCount}
      </Typography>
      <Typography color='secondary'>
      <Cancel /> {props.wrongCount}
      </Typography>
      <p></p>
      </ThemeProvider>
      </div>
    )
  }

  export default Scores;
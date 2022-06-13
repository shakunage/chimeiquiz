import React from 'react';
import chimei from '../ChimeiList'
import theme from '../theme';

import { ThemeProvider, CircularProgress } from '@material-ui/core'

const ProgressCircle = (props) => {
    return (
      <div>
      <ThemeProvider theme={theme}>
      <CircularProgress variant="determinate" value={((props.correctCount+props.wrongCount)/chimei.length)*100}/>
      </ThemeProvider>
      </div>
    )
  }

  export default ProgressCircle;
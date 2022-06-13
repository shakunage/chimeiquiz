import React from 'react';
import chimei from '../ChimeiList.js'
import theme from '../theme';
import {
    Typography, ThemeProvider
  } from '@material-ui/core'
  

const FinalScreen = (props) => {
  return (
    <div>
    <ThemeProvider theme={theme}>
    <Typography variant='h2'>
      おつかれさまです
    </Typography>
    <Typography variant='h5'>
      正答 {props.correctCount}
      <br></br>
      正答率 {Math.floor((props.correctCount/chimei.length)*100)}%
    </Typography>
    </ThemeProvider>
    </div>
  )
}

export default FinalScreen;
import React from 'react';

import theme from '../theme';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

import {
    Typography, ThemeProvider
  } from '@material-ui/core'

import { Check } from '@mui/icons-material'

  
const AnswerScreen = (props) => {
    return (
      <div>
      <center>
      <ThemeProvider theme={theme}>
        <Typography variant="h5" style={{display: props.show === 'right' ? 'block' : 'none' }}>正解です <Check color='warning'></Check></Typography>
        <Typography variant="subtitle1">{props.previous.kanji} ({props.previous.kana})</Typography>
        <Typography variant="h6">{props.previous.area}地域</Typography>
      </ThemeProvider>
        <p></p>
        <Zoom><img src={props.previous.map.src} style={{ width:500 }} alt={props.previous.map.alt}></img></Zoom>
        <br></br>
        <Zoom><img src={props.previous.img.src} style={{ width:500 }} alt={props.previous.img.alt}></img></Zoom>
        <Typography variant="h6">{props.previous.img.alt}</Typography>
        <br></br>
      </center>
      </div>
    )
  }

  export default AnswerScreen;
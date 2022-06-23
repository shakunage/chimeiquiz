import React from 'react';
import QuizRandom from './QuizRandom'
import QuizChallenge from './QuizChallenge'
import About from './components/About';
import { useState } from 'react'
import {
  Button, Typography, ThemeProvider
} from '@material-ui/core'
import {
  ToggleButtonGroup, ToggleButton
} from '@mui/material'

import Header from './components/Header.js';

import theme from './theme';

const QuizComponent = (props) => {
  if (props.mode === 'challenge') {
    return <div> <QuizChallenge /> </div>
  } else return <div> <QuizRandom /> </div>
}

const App = () => {
  const [quiz, setQuiz] = useState(false)
  const [gameMode, setGameMode] = useState("challenge")
  const [error, setError] = useState(false)
  const [about, setAbout] = useState(false)

  const children = [
    <ToggleButton value="challenge" key="challenge">
      チャレンジ
    </ToggleButton>,
    <ToggleButton value="random" key="random">
      ランダム
    </ToggleButton>,
  ]

  const handleChange = (event, newAlignment) => {
    event.preventDefault();
    setGameMode(newAlignment);
  }

  const control = {
    value: gameMode,
    onChange: handleChange,
    exclusive: true,
  }

  const startQuiz = () => {
    if ((gameMode === 'challenge')) {
      setQuiz('challenge')
      setError(false)
    }
    else if ((gameMode === 'random')) {
      setQuiz('random')
      setError(false)
    }
    else {
      setError(true)
    }
  }

  if (quiz) {
    return (
      <div>
      <center>
      <ThemeProvider theme={theme}>
      <Header/>
      <QuizComponent mode={quiz}/>
      <p></p>
      <Button         
        variant="contained" 
        avariant="text" 
        color='secondary' 
        size="large"
        style={{display: quiz ? 'block' : 'none' }} 
        onClick={() => setQuiz(false)}>戻る</Button>
        </ThemeProvider>
        </center>
      </div>
    )
  }

  if (about) {
    return (
    <div>
      <About/>
      <ThemeProvider theme={theme}>
      <center>
      <p></p>
      <Button         
        variant="contained" 
        avariant="text" 
        color='secondary' 
        size="large"
        onClick={() => setAbout(false)}>戻る</Button>
        </center>
      </ThemeProvider>
    </div>
    )
  }

  return (
    <div>
      <Header/>
      <ThemeProvider theme={theme}>
      <center>
        <Typography variant="h5">ケームモード</Typography>
        <br></br>
        <ToggleButtonGroup 
        size="small" 
        {...control}
        onChange={handleChange}>
        {children}
        </ToggleButtonGroup>
        <p></p>
        <Button 
        variant="contained"
        color="primary"
        size="large"
        onClick={() => startQuiz()}>
        <h1>開始</h1>
        </Button>
        <p></p>
        <Button 
        variant="contained"
        size="small"
        onClick={() => setAbout(true)}>
        <h5>クイズについて</h5>
        </Button>
        <Typography style={{display: error ? 'block' : 'none' }} color="secondary">ゲームモードを選択してください</Typography>
        </center>
    </ThemeProvider>
    </div>
  );
};

export default App;
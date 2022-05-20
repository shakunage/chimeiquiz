import React from 'react';
import Quiz from './Quiz.js'
import { useState } from 'react'
import {
  Button, Typography, ThemeProvider
} from '@material-ui/core'
import {
  ToggleButtonGroup, ToggleButton
} from '@mui/material'

import CssBaseline from "@material-ui/core/CssBaseline";
import theme from './theme';

const Header = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <center>
        <Typography variant="h3">邑南町の地名 <br></br> クイズ</Typography>
        <br></br>
        <Typography variant="h5">未完成のデモンストレーション版</Typography>
        </center>
        <br></br>
    </ThemeProvider>
  )
}

const App = () => {
  const [quiz, setQuiz] = useState(false)
  const [gameMode, setGameMode] = useState("challenge")
  const [error, setError] = useState(false)

  const children = [
    <ToggleButton value="challenge" key="challenge">
      チャレンジ
    </ToggleButton>,
    <ToggleButton value="random" key="random">
      ランダム
    </ToggleButton>,
  ]

  const handleChange = (event, newAlignment) => {
    setGameMode(newAlignment);
    console.log(gameMode)
  }

  const control = {
    value: gameMode,
    onChange: handleChange,
    exclusive: true,
  }

  const startQuiz = () => {
    if ((gameMode === 'challenge') || (gameMode === 'random')) {
      setQuiz(true)
      setError(false)
    }
    else {
      setError(true)
    }
  }

  if (quiz === true) {
    return (
      <div>
      <center>
      <ThemeProvider theme={theme}>
      <Header/>
      <Quiz mode={gameMode}/>
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
        <Typography style={{display: error ? 'block' : 'none' }} color="secondary">ゲームモードを選択してください</Typography>
        </center>
    </ThemeProvider>
    </div>
  );
  
};

export default App;
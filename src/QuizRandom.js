import React from 'react';
import { useState } from 'react';
import chimeiNonrandom from './ChimeiList'
import theme from './theme';

import AnswerScreen from './components/AnswerScreen';
import FinalScreen from './components/FinalScreen';
import Scores from './components/Scores'

import { Button, Typography, ThemeProvider, TextField } from '@material-ui/core'
import { Send } from '@mui/icons-material'

const chimei = chimeiNonrandom.sort(()=> Math.random() - 0.5)

const WrongAnswer = (props) => {
  if (props.answerCheck === 'wrong' & props.wrongAnswers < 3 ) {
    return <div color="primary">もう一度試してください</div>
  }
  else return null
}

const QuizRandom = (props) => {

  const [ placeName, setPlaceName ] = useState(0)
  const [ previousName, setPreviousName ] = useState('')
  const [ answer, setAnswer ] = useState('')
  const [ answerCheck, setAnswerCheck ] = useState('')
  const [ wrongAnswers, setWrongAnswers ] = useState(0)
  const [ answerArray, setAnswerArray ] = useState({
    correctCount: 0,
    wrongCount: 0
  })

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value)
  }

  const prepareNextQuestion = () => {
    setWrongAnswers(0)
    setAnswer('')
    setPreviousName(chimei[placeName])
    setPlaceName(Math.floor(Math.random()*chimei.length))
  }

  const checkAnswer = (e) => {
      if (chimei[placeName].kana === answer) {
        setAnswerCheck('right')
        setAnswerArray({
          correctCount: answerArray.correctCount+1,
          wrongCount: answerArray.wrongCount
        })
        prepareNextQuestion()
      }
      else {
        setAnswerCheck('wrong')
        setWrongAnswers(wrongAnswers+1)
      }
  }

  const enterCheck = (e) => {
    if (e.key === 'Enter') {
      if (chimei[placeName].kana === answer) {
        setAnswerCheck('right')
        setAnswerArray({
          correctCount: answerArray.correctCount+1,
          wrongCount: answerArray.wrongCount
        })
        prepareNextQuestion()
      } else {
        setAnswerCheck('wrong')
        setWrongAnswers(wrongAnswers + 1)
      }
    }
  }

  const showAnswer = () => {
    setAnswerCheck('show')
    setAnswerArray({
      correctCount: answerArray.correctCount,
      wrongCount: answerArray.wrongCount+1
    })
    prepareNextQuestion()
  }

  if (placeName === chimei.length) {
    return (
      <div>
        <FinalScreen correctCount={answerArray.correctCount}/>
      </div>
    )
  }

  if (answerCheck === 'right' || answerCheck === 'show' ) {
    return (
    <center>
      <Scores correctCount={answerArray.correctCount} wrongCount={answerArray.wrongCount}/>
      <br></br>
      <AnswerScreen show={answerCheck} previous={previousName} />
      <br></br>
      <ThemeProvider theme={theme}>
      <Button 
      size="large"
      variant="contained"
      onClick={() => setAnswerCheck('')}
      autoFocus
      color="primary"
      >次へ
      </Button>
      </ThemeProvider>
    </center>
    )
  }
  return (
    <center>
    <Scores correctCount={answerArray.correctCount} wrongCount={answerArray.wrongCount} mode='random' />
    <div style={{width: "50%"}}>
    <ThemeProvider theme={theme}>
      <Typography variant="subtitle1">{chimei[placeName].kanji}</Typography>
        <TextField 
          error={wrongAnswers>0}
          id="filled-error-helper-text"
          variant="standard"
          fullWidth
          value={answer}
          size="medium"
          onChange={handleAnswerChange}
          placeholder="答えをひらがなで入力してください"
          onKeyDown={(e) => enterCheck(e)}
          autoFocus
        />
        <p></p>
        <Button 
        onClick={() => checkAnswer()}
        variant="contained"
        color="primary"
        size="large"
        endIcon={<Send />}
        >送信</Button>
        <p></p>
        <WrongAnswer wrongAnswers={wrongAnswers} answerCheck={answerCheck}/>
        <Button 
        onClick={() => showAnswer()} style={{display: wrongAnswers > 2 ? 'block' : 'none' }}
        variant="contained"
        size="small"
        >答えを表示</Button>
      </ThemeProvider>
    </div>
    </center>
    );
};

export default QuizRandom;
import React from 'react';
import { useState } from 'react';
import chimeiNonrandom from './ChimeiList'
import theme from './theme';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

import {
  Button, Typography, ThemeProvider, TextField,
} from '@material-ui/core'

import { Send, Check, CheckCircle, Cancel } from '@mui/icons-material'

const chimei = chimeiNonrandom.sort(()=> Math.random() - 0.5)

const WrongAnswer = (props) => {
  if (props.answerCheck === 'wrong' & props.wrongAnswers < 3 ) {
    return <div color="primary">もう一度試してください</div>
  }
  else return null
}

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
      <Zoom><img src={props.previous.img.src} style={{ width:500 }} alt={props.previous.img.alt}></img></Zoom>
      <br></br>
      <Zoom><img src={props.previous.map.src} style={{ width:500 }} alt={props.previous.map.alt}></img></Zoom>
      {/*<Typography variant="h6">写真：{props.previous.img.alt}</Typography>*/}
      <br></br>
    </center>
    </div>
  )
}

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
    </ThemeProvider>
    </div>
  )
}
const Quiz = (props) => {

  console.log("mode is " + props.mode)
  const startValue = props.mode === 'challenge' ? 0 : Math.floor(Math.random()*chimei.length)
  const [ placeName, setPlaceName ] = useState(startValue)
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
    if (props.mode === 'random') {
      setPlaceName(Math.floor(Math.random()*chimei.length))
    } else {
      setPlaceName(placeName+1)
    }
  }

  const checkAnswer = (e) => {
      if (chimei[placeName].kana === answer) {
        setAnswerCheck('right')
        setAnswerArray({
          correctCount: answerArray.correctCount+1,
          wrongCount: answerArray.wrongCount
        })
        console.log('wrong: ' + answerArray.wrongCount + ' right: ' + answerArray.correctCount )
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
    console.log('wrong: ' + answerArray.wrongCount + ' right: ' + answerArray.correctCount )
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
    <Scores correctCount={answerArray.correctCount} wrongCount={answerArray.wrongCount}/>
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

export default Quiz;
import React, { useState, useEffect } from 'react'
import FlashcardList from './FlashcardList'
import './app.css'
import axios from 'axios'

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS)
  useEffect(() => {
    axios
      .get('https://opentdb.com/api.php?amount=10&category=17&difficulty=easy')
      .then((res) => {
        setFlashcards(
          res.data.results.map((questionItem, index) => {
            const answer = decodeString(questionItem.correct_answer)
            const options = [
              ...questionItem.incorrect_answers.map((a) => decodeString(a)),
              answer,
            ]
            return {
              id: `${index}-${Date.now()}`,
              question: decodeString(questionItem.question),
              answer: answer,
              options: options.sort(() => Math.random() - 0.5),
            }
          })
        )
      })
  }, [])

  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }

  return <FlashcardList flashcards={flashcards} />
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: 'q1',
    answer: 'a1',
    options: ['1', '2', '3'],
  },
  {
    id: 2,
    question: 'q2',
    answer: 'a2',
    options: ['1', '2', '3'],
  },
]

export default App

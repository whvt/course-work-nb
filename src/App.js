import React, { useState } from 'react'
import FlashcardList from './FlashcardList'
import './app.css'

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS)
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

import React, { useState, useEffect, useRef } from 'react'
import FlashcardList from './FlashcardList'
import './app.css'
import axios from 'axios'

function App() {
  const [flashcards, setFlashcards] = useState([])
  const [categories, setCategories] = useState([])

  const categoryEl = useRef()
  const amountEl = useRef()

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php').then((res) => {
      setCategories(res.data.trivia_categories)
    })
  }, [])

  useEffect(() => {}, [])

  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }

  function handleSubmit() {
    axios.get('http://localhost:4000/fetchdata').then((res) => {
      console.log(res)
      setFlashcards(
        res.data.cards.map((questionItem, index) => {
          const answer = decodeString(questionItem.answer)
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: answer,
          }
        })
      )
    })
  }

  return (
    <>
      <div className='btn-container'>
        <button className='btn' onClick={() => handleSubmit()}>
          Получить вопросы
        </button>
      </div>

      <div className='container'>
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  )
}

export default App

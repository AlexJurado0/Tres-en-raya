import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Square } from './components/square.jsx'
import { TURNS } from './constants.js'
import { chekWinner, checkEndGame } from './logic/board.js'
import { WinnerModar } from './components/WinnerModal.jsx'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage
      ? JSON.parse(turnFromStorage)
      : TURNS.X
  })
  const [winner, setWinner] = useState(null)
  console.log(board)


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }



  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurno = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurno)

    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', JSON.stringify(newTurno))

    const newWinner = chekWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) //empate
    }
  }
  return (
    <main className='board'>
      <h1>Tres en raya</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelectd={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelectd={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModar winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App

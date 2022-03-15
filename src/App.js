import React from "react"
import Die from "./components/Die"
import Mode from "./components/Mode"
import { nanoid } from "nanoid"

import Confetti from "react-confetti"
import { FiSettings } from "react-icons/fi"
import { GrPowerReset } from "react-icons/gr"

export default function App() {

  const [dotMode, setDotMode] = React.useState(true)
  const [darkMode, setDarkMode] = React.useState(false)
  function handleDotToggle() {
    setDotMode(prevMode => !prevMode)
    setDice(prevDice => prevDice.map(die => {
      return {...die, isDot: !die.isDot}
    }))
  }

  function handleDarkToggle() {
    setDarkMode(prevMode => !prevMode)
  }

  React.useEffect(function() {
    document.body.style.backgroundColor = darkMode ?  "black" :  "#2a2333" 
  }, [darkMode, dotMode])

  function allNewDice() {
    const diceArr = []
    for (let i=0; i < 10; i++) {
      diceArr.push({
        id: nanoid(),
        value: Math.ceil(Math.random()*6),
        isHeld: false,
        isDot: dotMode
      })
    }
    return diceArr
  }

  //* define state, initialized with 10 rand #s (allNewDice)
  const [dice, setDice] = React.useState(allNewDice())
  //* map array[dice] elements to dieElements--rendered in html below
  const dieElements = dice.map(die => (
    <Die
      key={die.id}
      id={die.id} 
      value={die.value}
      isHeld={die.isHeld}
      isDot={die.isDot}
      handleClick={holdDice}
    />
  ))
  
  const [tenzies, setTenzies] = React.useState(false)
  const [best, setBest] = React.useState(localStorage.getItem("best") || 0)
  const [moveCount, setMoveCount] = React.useState(0)

  function rollDice() {
    //setDice(allNewDice())
    if (tenzies) {
      setDice(allNewDice())
      //reset game state
      setTenzies(false)
      //reset move count
      setMoveCount(0)
    } else {
      //add to move count
      setMoveCount(prevCount => prevCount + 1)
      //roll unheld dice
      setDice(prevDice => prevDice.map(die => {
        return !die.isHeld ? 
          {...die, value: Math.ceil(Math.random()*6)} :
          die
      }))
    }
  }

  function holdDice(id) {
    setDice(prevDice => {
      return prevDice.map(die => ({
        ...die,
        isHeld: die.id === id ? !die.isHeld : die.isHeld
      }))
    })
  }

  function resetBest() {
    setBest(0)
    localStorage.setItem("best", best)
  }


  React.useEffect(function() {
    //with every
    const allHeld = dice.every(die => die.isHeld)
    //check if all dice have same actual valuee
    const allSame = dice.every(die => die.value === dice[0].value)

    if (allHeld && allSame) {    
      //set best function
      if (best === "0" || moveCount < best) {
        setBest(moveCount)
      } 
      
      //save to local storage
      localStorage.setItem("best", best)      
      setTenzies(true)
      console.log("You won!")
    }
  }, [best, dice, tenzies, moveCount])
  

  return( 
    <div className="container">
      <main className={`main ${darkMode ? " dark" : ""}`}>
        {tenzies && <Confetti />}
        
        
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          {/*TODO: replace below with reroll (dice symbol) */}
          {/* <GrPowerReset className="icon" onClick={resetBest}/> */}
        <Mode
          handleReset={resetBest}
          handleDotToggle={handleDotToggle}
          handleDarkToggle={handleDarkToggle}
          dotMode={dotMode} 
          darkMode={darkMode}
        />
        <div className="dice-container">
          {dieElements}
        </div>
        <button className="btn-roll" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        <div className="scores">
          <h4>Best: {best}</h4>
          <p>Moves: {moveCount}</p>

        </div>
      </main>
    </div>
  )
}
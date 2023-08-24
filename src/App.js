import React, { useState, useEffect } from "react";
import "./App.css"
import Header from "./components/Header/Header";
import Triangle from './assets/bg-triangle.svg'
import Scissors from './assets/icon-scissors.svg'
import Rock from './assets/icon-rock.svg'
import Paper from './assets/icon-paper.svg'
import Rules from './components/Rules/Rules'
import Circle from "./components/Game/Circle";
import { CSSTransition } from 'react-transition-group';



function App() {
  const [showStart, setShowStart] = useState(true)
  const [playerChoice, setPlayerChoice] = useState(null);
  const [systemChoice, setSystemChoice] = useState(null);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [result, setResult] = useState()
  const [score, setScore] = useState(() => {
    const storedScore = localStorage.getItem("playerScore");
    return storedScore !== null ? parseInt(storedScore) : 0;
  });

  const scissors = {
    primaryBorderColor: '39, 89%, 49%',
    secondBorderColor: '40, 84%, 53%',
    icon: Scissors
  }

  const rock = {
    primaryBorderColor: '349, 71%, 52%',
    secondBorderColor: '349, 70%, 56%',
    icon: Rock
  }

  const paper = {
    primaryBorderColor: '230, 89%, 62%',
    secondBorderColor: '230, 89%, 62%',
    icon: Paper
  }


  useEffect(() => {
    localStorage.setItem("playerScore", score.toString());
  }, [score]);

  useEffect(() => {
    if (playerChoice !== null) {
      const timer = setTimeout(() => {
        setShowButton(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [playerChoice]);

  const openRules = () => {
    setRulesOpen(true);
  };

  const closeRules = () => {
    setRulesOpen(false);
  };


  function playAgain() {
    setShowStart(true)
    setShowButton(false)
    setPlayerChoice(null)
  }

  function resultChecker(player, system) {
    if (player === system) {
      setResult('TIE');
    } else if (
      (player === 'rock' && system === 'scissors') ||
      (player === 'paper' && system === 'rock') ||
      (player === 'scissors' && system === 'paper')
    ) {
      setResult('YOU WIN');
      setScore(prevScore => prevScore + 1); 
    } else {
      setResult('YOU LOSE');
      setScore(prevScore => prevScore - 1);
    }
  }

  function playerChoiceHandler(choice) {
    const options = ['scissors', 'rock', 'paper']
    setPlayerChoice(choice);
    setShowStart(false)
    const randomIndex = Math.floor(Math.random() * options.length);
    const randomOption = options[randomIndex];
    setSystemChoice(randomOption)

    resultChecker(choice, randomOption)
  }

  return (
    <div className="game">
      <Header score={score} />

      {showStart &&
        <>
          <img className="triangle" src={Triangle} alt="Triangle"></img>
          <div className="options">
            <div className='scissors'>
              <Circle onClickHandler={() => playerChoiceHandler('scissors')} type={scissors} />
            </div>

            <div className='rock'>
              <Circle onClickHandler={() => playerChoiceHandler('rock')} type={rock} />
            </div>

            <div className='paper'>
              <Circle onClickHandler={() => playerChoiceHandler('paper')} type={paper} />
            </div>
          </div>
        </>
      }

      <CSSTransition
        in={playerChoice !== null}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <div className="choices-container">
          <div className="choice player-choice">
            <Circle type={playerChoice === 'scissors' ? scissors : playerChoice === 'rock' ? rock : paper} />
          </div>
          <h1>{result}</h1>
          <div className="choice system-choice">
            <Circle type={systemChoice === 'scissors' ? scissors : systemChoice === 'rock' ? rock : paper} />
          </div>

        </div>
      </CSSTransition>

      {showButton &&
        <div className="result-button">
          <button onClick={() => playAgain()}>PLAY AGAIN</button>
        </div>}


      <button className="rules" onClick={openRules}>RULES</button>
      {rulesOpen &&
        <Rules isOpen={rulesOpen} onClose={closeRules} />
      }
    </div>
  );
}


export default App;

import React from 'react'
import "./Header.css"

const Header = ({ score }) => {
    return (
        <header>
            <div className='header-title'>
                <h2 >ROCK</h2 >
                <h2 >PAPER</h2 >
                <h2 >SCISSORS</h2>
            </div>
            <div className='header-score'>
                <p>SCORE</p>
                <span>{score}</span>
            </div>
        </header>
    )
}

export default Header
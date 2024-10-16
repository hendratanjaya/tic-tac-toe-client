/* eslint-disable react/prop-types */

import { useEffect } from 'react';
import { useState } from 'react'
import { updateHistory } from '../hooks/fetchData';
function Square({value, onSquareClick}){
  
  return <button className="square" onClick={onSquareClick}> {value} </button>
  
}

export default function Board({setStatus,setHistory,history,activeGame}) {
  //const [count, setCount] = useState(0)
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext,setIsNext] = useState(true);
  const winner = calculateWinner(squares);
  
  function handleClick(i) {
    
    if(winner === 'X' || winner === "O" ){
      
      const updatedHistory = history.slice(); 
      if(winner === 'X')
        updatedHistory[activeGame].player1.score++;
      else
        updatedHistory[activeGame].player2.score++;
      
      setHistory(updatedHistory);
      updateHistory(updatedHistory[activeGame],activeGame);
      setSquares(Array(9).fill(null));
      
    }else if(winner === "Draw")
      setSquares(Array(9).fill(null));
    if(squares[i] || calculateWinner(squares)) return;
    
    const nextSquare = squares.slice();
    nextSquare[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquare);
    setIsNext(!xIsNext);
    
    
  }

  
  useEffect(()=>{
    // let status = winner !== "Draw"? ("Winner: " + winner): winner === "Draw" ? winner : ("Next Player: " + (xIsNext ? 'X' : 'O')); 

    let status = winner === "Draw" ? winner : winner === false ?  ("Next Player: " + (xIsNext ? 'X' : 'O')) : ("Winner: " + winner);
    setStatus(status);
    
  },[xIsNext,squares])

  useEffect(()=>{
    setSquares(Array(9).fill(null));
  },[activeGame])
  
  return (
    <>
      <div className="board">
        {squares.map((square, idx) => (
          <Square key={idx} value={square} onSquareClick={() => handleClick(idx)} />
        ))} 
      </div>
    </>
  );
}

function calculateWinner(squares){

  const lines = [

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]

  ];
  let isDraw = true;
  for(let i = 0; i < lines.length; ++i){
    const [a,b,c] = lines[i];

    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      
      return squares[a]
    }

    if(squares[a] === null || squares[b] === null || squares[c] === null)
      isDraw = false;

  }
  if(isDraw)
    return "Draw";

  return false;
}


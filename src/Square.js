import React, { createContext, useState, useContext } from 'react';


export default function Square({nextPlayer, setNextPlayer, id, squares, setSquares, winner, isDraw, winLine}){
    
  function handleClick(){

    if(squares[id] === null && !winner && !isDraw){

      if(nextPlayer === 'X')  {
        const newSquares = squares.slice();
        newSquares[id] = 'X';
        setSquares(newSquares);
        setNextPlayer('O');
      }

      else  {
        const newSquares = squares.slice();
        newSquares[id] = 'O';
        setSquares(newSquares);
        setNextPlayer('X');
      }
    }

  }
  const txtColor = squares[id] ==='X' ? "text-green-600" : "text-blue-600";

  let belongsToWinLineStyle="";
  if(winner){
    for( let i in winLine){
      if (id == winLine[i]) {
        belongsToWinLineStyle = "";

      }
    }
  }

  return(
    <div className= {`w-20 h-20 bg-green-100 border-r border-b  border-gray-300 flex justify-center items-center text-5xl cursor-pointer ${txtColor} ${belongsToWinLineStyle}`} onClick={handleClick}>{squares[id]}</div>
    
  );
}
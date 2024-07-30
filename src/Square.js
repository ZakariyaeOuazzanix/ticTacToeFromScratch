import React, { createContext, useState, useContext } from 'react';


export default function Square({id, winner, isDraw, winLine, gameHistory, setGameHistory,
   boardDisplayed, setBoardDisplayed, computerIsPlaying, setComputerIsPlaying}){
    
  function handleClick(){
    if(gameHistory[boardDisplayed][id] === null && !winner && !isDraw){
      
      if(boardDisplayed % 2 == 0)  {
        const newBoard = gameHistory[boardDisplayed].slice();
        newBoard[id] = 'X';
        const newGameHistory = gameHistory.slice(0, boardDisplayed + 1);
        newGameHistory.push(newBoard);
        setGameHistory(newGameHistory);
        const newBoardDisplayed = boardDisplayed + 1 
        setBoardDisplayed(newBoardDisplayed);
        //setNextPlayer('O');
      }

      else  {
        const newBoard = gameHistory[boardDisplayed].slice();
        newBoard[id] = 'O';
        const newGameHistory = gameHistory.slice(0, boardDisplayed + 1);
        newGameHistory.push(newBoard);
        setGameHistory(newGameHistory);
        const newBoardDisplayed = boardDisplayed + 1 
        setBoardDisplayed(newBoardDisplayed);
        //setNextPlayer('X');
      }

       
      
    }

  }



  const txtColor = gameHistory[boardDisplayed][id] ==='X' ? "text-green-600" : "text-blue-600";

  let belongsToWinLineStyle="";
  if(winner){
    for( let i in winLine){
      if (id == winLine[i]) {
        belongsToWinLineStyle = "";

      }
    }
  }

  return(
    <div className= {`w-20 h-20 bg-green-100 border-r border-b  border-gray-300 flex justify-center items-center text-5xl cursor-pointer ${txtColor} ${belongsToWinLineStyle}`} onClick={handleClick}>{gameHistory[boardDisplayed][id]}</div>
    
  );
}
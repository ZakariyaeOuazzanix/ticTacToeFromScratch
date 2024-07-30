import React, { createContext, useState, useContext } from 'react';

import Square from "./Square";

export default function Board({gameHistory, setGameHistory, boardDisplayed, setBoardDisplayed, computerIsPlaying, setComputerIsPlaying}){

  //const [squares, setSquares] = useState(Array(9).fill(null)) ;
  //const [nextPlayer, setNextPlayer] = useState("X");

  function possibleMovesFct(board){
    let ArrayOfPossibleMoves = Array(9).fill(false);
    for (let i=0; i<9; i++){
      if (!board[i])  ArrayOfPossibleMoves[i] = true;
    }
    return ArrayOfPossibleMoves;
  }

  //a winning line has at least one of 'nextplayer' and no value of other player
  function isWinningLineForPlayer(line){
    let nextPlayer; 
    boardDisplayed % 2 == 0 ? nextPlayer = 'X' : nextPlayer = 'O';
    let playerSquare = 0;
    let otherPlayerSquare = 0;
    for (let i in line){
      if(line[i] === nextPlayer) playerSquare++;
      else if(line[i] && line[i] !== nextPlayer) otherPlayerSquare++;
    }
    return (playerSquare > 0 && otherPlayerSquare ==0);
  }

  function winCases(boardWithMove){
    // return in how many lines there could be a win
    let nbOfWinningLines = 0;
    // loop over all of the lines and return if it is a winning line or not 
    const winLines = [
      [0,1,2], // 0 :horizontal-top
      [0,3,6], // 1 :vertical-left
      [0,4,8], // 2 :diagonal-left-to-right
      [2,4,6], // 3 :diagonal-right-to-left
      [1,4,7], // 4 :vertical-center
      [2,5,8], // 5 :vertical-right
      [3,4,5], // 6 :horizontal-center
      [6,7,8]  // 7 :horizontal-bottom
    ]
    for (let idx in winLines){
      const [a,b,c] = winLines[idx];
      const line = [boardWithMove[a],boardWithMove[b],boardWithMove[c]];
      if(isWinningLineForPlayer(line)){
        nbOfWinningLines ++;
      }
    }
    return nbOfWinningLines;
  }

  function blockMove(){
    let BlockingMoveIndex = null;
    let currentBoard = gameHistory[boardDisplayed];
    let nextPlayer; 
    let otherPlayer;

    if(boardDisplayed % 2 == 0){
      nextPlayer = 'X';
      otherPlayer = 'O';
    }
    else{
      nextPlayer = 'O';
      otherPlayer = 'X';
    }
    
    const winLines = [
      [0,1,2], // 0 :horizontal-top
      [0,3,6], // 1 :vertical-left
      [0,4,8], // 2 :diagonal-left-to-right
      [2,4,6], // 3 :diagonal-right-to-left
      [1,4,7], // 4 :vertical-center
      [2,5,8], // 5 :vertical-right
      [3,4,5], // 6 :horizontal-center
      [6,7,8]  // 7 :horizontal-bottom
    ]
    for (let idx in winLines){
      const [a,b,c] = winLines[idx];
      if(currentBoard[a] == otherPlayer && currentBoard[b] == otherPlayer && !currentBoard[c]) BlockingMoveIndex = c;
      else if(currentBoard[a] == otherPlayer && currentBoard[c] == otherPlayer && !currentBoard[b]) BlockingMoveIndex = b;
      else if(currentBoard[b] == otherPlayer && currentBoard[c] == otherPlayer && !currentBoard[a]) BlockingMoveIndex = a;
    }

    return BlockingMoveIndex;
  }

  function playComputerMove(){
    setTimeout(() => {
      
    }, 500);
    let BlockingMoveIndex = null;
    BlockingMoveIndex = blockMove();
    if(!BlockingMoveIndex){
      let nextPlayer; 
      boardDisplayed % 2 == 0 ? nextPlayer = 'X' : nextPlayer = 'O';
      let board = gameHistory[boardDisplayed];
      let possibleMoves = possibleMovesFct(board);
      // true means a move is possible in that board position
      //returns an array of booleans of where the moves are possible like[false,false,true,true,false,true..]
      let maxNbOfWinCases = 0;
      let chosenIndex = 0;
      //nb of wincases for each move that is possible (ie has true)
      for (let i in possibleMoves){
        if(possibleMoves[i]){
          let boardWithMove = board.slice();
          boardWithMove[i] = nextPlayer;
          let winPossibilities = winCases(boardWithMove);
          //this winCases function could be recursive, nextPlayer 'X' or 'O' which is the computer
          if(winPossibilities > maxNbOfWinCases) {
            maxNbOfWinCases = winPossibilities;
            chosenIndex = i;
          }
        }
      }
      const newBoard = board.slice();
      newBoard[chosenIndex] = nextPlayer;
      const newGameHistory = gameHistory.slice(0, boardDisplayed + 1);
      newGameHistory.push(newBoard);
      setGameHistory(newGameHistory);
      const newBoardDisplayed = boardDisplayed + 1;
      setBoardDisplayed(newBoardDisplayed);
   
    }
    else{
      let nextPlayer; 
      boardDisplayed % 2 == 0 ? nextPlayer = 'X' : nextPlayer = 'O';
      let board = gameHistory[boardDisplayed];
      const newBoard = board.slice();
      newBoard[BlockingMoveIndex] = nextPlayer;
      const newGameHistory = gameHistory.slice(0, boardDisplayed + 1);
      newGameHistory.push(newBoard);
      setGameHistory(newGameHistory);
      const newBoardDisplayed = boardDisplayed + 1;
      setBoardDisplayed(newBoardDisplayed);
    }
    }

  function resetBoard(){
    const newGameHistory = [Array(9).fill(null)];
    setGameHistory(newGameHistory);

    setBoardDisplayed(0);

    /*const newSquares = Array(9).fill(null);
    setSquares(newSquares);*/
    //setNextPlayer('X');
  }

  /*if(boardDisplayed != gameHistory.length -1){
    const newSquares = gameHistory[boardDisplayed];
    setSquares(newSquares);
  }*/

  const textColor = (boardDisplayed % 2 == 0) ? "text-green-500" : "text-blue-500";

  function notWinningLine(a,b,c){
    /* for this to be not a winning line definetly, it has to be occupied by at least two non null squares and they have to be of different value */ 
    const combinations = [
      [a,b],
      [b,c],
      [a,c]
    ]
    for (let i in combinations){
      const [x,y] = combinations[i]
      if(gameHistory[boardDisplayed][x] && gameHistory[boardDisplayed][y] && gameHistory[boardDisplayed][x] !== gameHistory[boardDisplayed][y]) return true;
    }
    return false;
  }

  const isDraw = () => {
    const nullArr = gameHistory[boardDisplayed].filter((square) => square == null)
    if (nullArr.length <= 1)  return true;  
    let count = 0;
    const possibleWinLines = [
      [0,1,2],
      [0,3,6],
      [0,4,8],
      [2,4,6],
      [1,4,7],
      [2,5,8],
      [3,4,5],
      [6,7,8]
    ]
    for (let idx in possibleWinLines){
      const [a,b,c] = possibleWinLines[idx];
      if(notWinningLine(a,b,c)) count++;
    }
    if (count ==8)  return true
    return false;
  }

  const getWinner = () => {
    const winLines = [
      [0,1,2], // 0 :horizontal-top
      [0,3,6], // 1 :vertical-left
      [0,4,8], // 2 :diagonal-left-to-right
      [2,4,6], // 3 :diagonal-right-to-left
      [1,4,7], // 4 :vertical-center
      [2,5,8], // 5 :vertical-right
      [3,4,5], // 6 :horizontal-center
      [6,7,8]  // 7 :horizontal-bottom
    ]
    for (let idx in winLines){
      const [a,b,c] = winLines[idx];

      /*console.log(boardDisplayed);
      console.log(gameHistory);
      console.log(gameHistory[boardDisplayed]);
      console.log(gameHistory[boardDisplayed][a]);*/
      if(gameHistory[boardDisplayed][a] && gameHistory[boardDisplayed][a]===gameHistory[boardDisplayed][b] && gameHistory[boardDisplayed][b]===gameHistory[boardDisplayed][c]){
        return {
          winner : gameHistory[boardDisplayed][a],
          winningLine : winLines[idx],
          winLineIndex : idx
        }
      }
    }
    return null;
  }

  const { winner, winningLine , winLineIndex} = getWinner() || {};

  let winnerColor;
  if(winner === 'X') {
    winnerColor = "text-green-500";
  }
  else if (winner === 'O') {
    winnerColor = "text-blue-500";
  }

  let winLineThroughStyles = "hidden";
  if(winner){
    let lineThroughColor = winner === 'X' ? "bg-green-300" : "bg-blue-300";
    switch(winLineIndex){
      case '0':
        winLineThroughStyles = `absolute w-[90%] top-[40px] h-[5px] ${lineThroughColor}`;
        break;
      case '1':
        winLineThroughStyles = `absolute h-[90%] left-[37.5px] w-[5px] ${lineThroughColor} `;
        break;
      case '2':
        winLineThroughStyles = `absolute w-[105%] h-[5px] ${lineThroughColor} rotate-45`;
        break;
      case '3':
        winLineThroughStyles = `absolute w-[105%] h-[5px] ${lineThroughColor} -rotate-45`;
        break;
      case '4':
        winLineThroughStyles = `absolute h-[90%] left-[117.5px] w-[5px] ${lineThroughColor} `;
        break;
      case '5':
        winLineThroughStyles = `absolute h-[90%] left-[197.5px] w-[5px] ${lineThroughColor} `;
        break;
      case '6':
        winLineThroughStyles = `absolute w-[90%] top-[117.5px] h-[5px] ${lineThroughColor} `;
        break;
      case '7':
        winLineThroughStyles = `absolute w-[90%] top-[200px] h-[5px] ${lineThroughColor} `;
        break;
    }
  }
  return(
    <>

      <div className="text-2xl mb-3 flex justify-center items-center font-semibold">
        {

          !winner ? ( !isDraw() ? (<> Next Player : <span className={`text-3xl ml-5 ${textColor}`}>{boardDisplayed %2 ==0 ? 'X' : 'O'}</span> </> )
                      : <><span className="text-green-500 text-3xl mr-5">X</span> DRAW!<span className="text-blue-500 text-3xl ml-5">O</span></>
          ) : <>Winner : <span className={`text-3xl underline ml-5 ${winnerColor}`}>{winner}</span></>
                    
        }
          
      </div>


      <div className='w-fit h-fit relative flex justify-center items-center'> 
      <div id='win-line-through' className={`${winLineThroughStyles}`}></div>
     
        <div className= {`grid grid-cols-3 grid-rows-3 gap-0 w-max shadow-lg rounded-xl win-line-through`}>
          {
          gameHistory[boardDisplayed].map((elt, idx)=>
            <Square key={idx} id={idx}
            computerIsPlaying={computerIsPlaying} setComputerIsPlaying={setComputerIsPlaying}
            winner={winner} isDraw={isDraw()}  winLine={winningLine} gameHistory={gameHistory} 
            setGameHistory={setGameHistory} boardDisplayed={boardDisplayed} setBoardDisplayed={setBoardDisplayed}/>
          )}

      </div>
      </div>
      <button className='mt-10 bg-red-400 text-md text-white rounded-md shadow-md py-3 px-4' onClick={() => (computerIsPlaying ? playComputerMove() : {})}>Reveal computer move</button>
      <button className='mt-10 bg-blue-400 text-md text-white rounded-md shadow-md py-3 px-4' onClick={() => resetBoard()}>Reset</button>

    </>
  );
}
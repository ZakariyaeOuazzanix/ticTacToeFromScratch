/*import logo from './logo.svg';
import './App.css';*/
import React, { createContext, useState, useContext } from 'react';


function Board(){

  const [squares, setSquares] = useState(Array(9).fill(null)) ;
  const [nextPlayer, setNextPlayer] = useState("X");

  const textColor = nextPlayer === 'X'? "text-green-500" : "text-blue-500";

  function notWinningLine(a,b,c){
    /* for this to be not a winning line definetly, it has to be occupied by at least two non null squares and they have to be of different value */ 
    const combinations = [
      [a,b],
      [b,c],
      [a,c]
    ]
    for (let i in combinations){
      const [x,y] = combinations[i]
      if(squares[x] && squares[y] && squares[x] !== squares[y]) return true;
    }
    return false;
  }

  const isDraw = () => {
    const nullArr = squares.filter((square) => square == null)
    if (nullArr.length <= 2)  return true;  
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
      [0,1,2],
      [0,3,6],
      [0,4,8],
      [2,4,6],
      [1,4,7],
      [2,5,8],
      [3,4,5],
      [6,7,8]
    ]
    for (let idx in winLines){
      const [a,b,c] = winLines[idx];
      if(squares[a] && squares[a]===squares[b] && squares[b]===squares[c]){
        return {
          winner : squares[a],
          winningLine : winLines[idx]
        }
      }
    }
    return null;
  }

  const { winner, winningLine } = getWinner() || {};

  let winnerColor;
  if(winner === 'X') {
    winnerColor = "text-green-500";
  }
  else if (winner === 'O') {
    winnerColor = "text-blue-500";
  }
  return(
    <>

      <div className="text-2xl mb-3 flex justify-center items-center font-semibold">
        {

          
          !winner ? ( !isDraw() ? (<> Next Player : <span className={`text-3xl ml-5 ${textColor}`}>{nextPlayer}</span> </> )
                      : <><span className="text-green-500 text-3xl mr-5">X</span> DRAW!<span className="text-blue-500 text-3xl ml-5">O</span></>
          ) : <>Winner : <span className={`text-3xl underline ml-5 ${winnerColor}`}>{winner}</span></>
          
          
          
        }
          
      </div>


      <div className="grid grid-cols-3 grid-rows-3 gap-0 w-max shadow-lg rounded-xl">
        {
        squares.map((elt, idx)=>
          <Square key={idx} id={idx} squares={squares} setSquares={setSquares} nextPlayer={nextPlayer} setNextPlayer={setNextPlayer} winner={winner} isDraw={isDraw()}  winLine={winningLine}/>
        )}
      </div>
      

    </>
  );
}


function Square({nextPlayer, setNextPlayer, id, squares, setSquares, winner, isDraw, winLine}){
    
  const [squareContent, setSquareContent] = useState('');
  /*console.log('recalled from root!');*/
  
  function handleClick(){

    /*console.log('handle click called!');*/
    if(squareContent === '' && !winner && !isDraw){

      if(nextPlayer === 'X')  {
        setSquareContent('X');
        /*const newSquares = squares.slice();*/
        squares[id] = 'X';
        setSquares(squares);
        setNextPlayer('O');
      }

      else  {
        setSquareContent('O');
        squares[id] = 'O';
        setSquares(squares);
        setNextPlayer('X');
      }
    }

  }

  const txtColor = squareContent ==='X' ? "text-green-600" : "text-blue-600";

  let belongsToWinLineStyle="";
  if(winner){
    for( let i in winLine){
      if (id == winLine[i]) {
        belongsToWinLineStyle = "line-through";
        console.log(id)
      }
    }
  }

  return(
    <div className= {`w-20 h-20 bg-green-100 border-r border-b  border-gray-300 flex justify-center items-center text-5xl cursor-pointer ${txtColor} ${belongsToWinLineStyle}`} onClick={handleClick}>{squareContent}</div>
    
  );
}



function App() {





  return (
    <>

      <div className="flex flex-col justify-center items-center min-h-screen">
        
          <Board/>
            
      </div>
      
    </>
    
  );


}

export default App;

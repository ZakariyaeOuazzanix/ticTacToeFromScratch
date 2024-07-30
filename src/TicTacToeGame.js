import React, { createContext, useState, useContext } from 'react';
import Board from './Board';
import Square from './Square';

export default function TicTacToeGame(){
  const [gameHistory, setGameHistory] = useState([Array(9).fill(null)]);
  const [boardDisplayed, setBoardDisplayed] = useState(0);
  const [ascendingHistoryDisplay, setAscendingHistoryDisplay] = useState(true);
  const [computerIsPlaying, setComputerIsPlaying] = useState(false);

  function toggleMovesOrder(){
    const newOrderDisplay = ! ascendingHistoryDisplay;
    setAscendingHistoryDisplay(newOrderDisplay);
  }

  function getChangedIndex(arr1, arr2){
    for (let idx in arr1){
      if(arr1[idx] !== arr2[idx]) return idx
    }
  }

  function getRowsCols(indexesOfChangedSquares){
    const rowsColsArray = [];
    for (let i in indexesOfChangedSquares){
      let rowCol;
      switch(indexesOfChangedSquares[i]){
        case '0':
          rowCol = [1,1];
          break;
        case '1':
          rowCol = [1,2];
          break;
        case '2':
          rowCol = [1,3];
          break;
        case '3':
          rowCol = [2,1];
          break;
        case '4':
          rowCol = [2,2];
          break;
        case '5':
          rowCol = [2,3];
          break;
        case '6':
          rowCol = [3,1];
          break;
        case '7':
          rowCol = [3,2];
          break;
        case '8':
          rowCol = [3,3] ;
          break;
      }
      //console.log('idx[i] : ' + indexesOfChangedSquares[i]);
      rowsColsArray.push(rowCol);
    }
    return rowsColsArray;
  }


  function getMovesList(){
    let indexesOfChangedSquares = [];
    for (let index = 1; index <gameHistory.length; index++){
      indexesOfChangedSquares.push(getChangedIndex(gameHistory[index -1], gameHistory[index]));
    } 
    //console.log(indexesOfChangedSquares);
    const rowsColsChangedSquares = getRowsCols(indexesOfChangedSquares);
    //console.log(rowsColsChangedSquares);

    return gameHistory.map(
      (board,idx) => 
      
      
      (
        idx == 0 ? (<li className="text-black" key={idx}><button onClick={() => goToBoard(idx)}>Go to game start</button></li>)

        
        : idx == boardDisplayed ? (<li className={`${idx % 2 ==1 ? "text-green-500" : "text-blue-500"}`} key={idx}>You are at move #{idx} {`(${rowsColsChangedSquares[idx -1][0]},${rowsColsChangedSquares[idx -1][1]})`}</li>)
        
        : (<li className={`${idx % 2 ==1 ? "text-green-500" : "text-blue-500"}`} key={idx}><button onClick={() => goToBoard(idx)}>Go to move #{idx} {`(${rowsColsChangedSquares[idx -1][0]},${rowsColsChangedSquares[idx -1][1]})`}</button></li>)

      )
      
      
      );
  }

  function goToBoard(idx){
    setBoardDisplayed(idx);
  }

  function togglePlayComputer(){
    computerIsPlaying ? setComputerIsPlaying(false) : setComputerIsPlaying(true);
  }

  
  return (
    <>
     <div className='mb-10'>
        <button onClick={togglePlayComputer}>{computerIsPlaying ? 'Turn off computer' : 'Play with computer'}
        </button>
      </div> 
      <div className='flex gap-x-20 justify-center items-center min-h-screen min-w-fit'>
        <div className="flex flex-col">
            <Board gameHistory={gameHistory} setGameHistory={setGameHistory} 
            boardDisplayed={boardDisplayed} setBoardDisplayed={setBoardDisplayed}
            computerIsPlaying={computerIsPlaying} setComputerIsPlaying={setComputerIsPlaying}
            />    
        </div>

        <div>
          <button onClick={toggleMovesOrder}>Reverse display</button>
          <ol>
          {
          ascendingHistoryDisplay ? getMovesList() : getMovesList().slice().reverse()
          
        }

          </ol>
        </div>
        
        <div className=''></div>
      </div>


    </>
    
  );

} 
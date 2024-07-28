/*import logo from './logo.svg';
import './App.css';*/
import React, { createContext, useState, useContext } from 'react';
import Board from './Board';
import Square from './Square';


function App() {

  const [gameHistory, setGameHistory] = useState([Array(9).fill(null)]);
  const [boardDisplayed, setBoardDisplayed] = useState(0);
  const [ascendingHistoryDisplay, setAscendingHistoryDisplay] = useState(true);

  function toggleMovesOrder(){
    const newOrderDisplay = ! ascendingHistoryDisplay;
    setAscendingHistoryDisplay(newOrderDisplay);
  }

  function getMovesList(){
    return gameHistory.map(
      (board,idx) => 
      
      
      (
        idx == 0 ? (<li className="text-black" key={idx}><button onClick={() => goToBoard(idx)}>Go to game start</button></li>)

        
        : idx == boardDisplayed ? (<li className={`${idx % 2 ==1 ? "text-green-500" : "text-blue-500"}`} key={idx}>You are at move #{idx}</li>)
        
        : (<li className={`${idx % 2 ==1 ? "text-green-500" : "text-blue-500"}`} key={idx}><button onClick={() => goToBoard(idx)}>Go to move #{idx}</button></li>)

      )
      
      
      )
  }

  function goToBoard(idx){
    setBoardDisplayed(idx);
  }

  
  return (
    <>

      <div className='flex gap-x-20 justify-center items-center min-h-screen min-w-fit'>
        <div className="flex flex-col">
            <Board gameHistory={gameHistory} setGameHistory={setGameHistory} 
            boardDisplayed={boardDisplayed} setBoardDisplayed={setBoardDisplayed}/>    
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

export default App;

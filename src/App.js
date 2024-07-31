/*import logo from './logo.svg';
import './App.css';*/
import React, { createContext, useState, useContext } from 'react';
import Board from './Board';
import Square from './Square';
import TicTacToeGame from './TicTacToeGame';
import CircleGenerator from './CircleGenerator';
import GraphGenerator from './GraphGenerator';
function App() {

const [gameDisplayed, setGameDisplayed] = useState(null);

  function chooseGame(chosen){
    setGameDisplayed(chosen);
  }

  function displayExcuse(game){
    return (
      <>
        <div className='flex flex-col justify-center items-center gap-y-40 mt-20'>
          <button className='underline self-start text-lg text-blue-600 hover:text-purple-500' onClick={() => setGameDisplayed(null)}>&lt; Go back</button>
          <div className='text-xl'>Sorry no {game} game yet !</div>
        </div>
      </>
    );
  }

  function renderGames(){
    switch (gameDisplayed){
      case 0:
        return displayExcuse('chess');
      case 1:
        return (
        <>
          <button className='z-50 underline mt-4 text-lg text-blue-600 hover:text-purple-500' onClick={() => setGameDisplayed(null)}>&lt; Go back</button>
          <TicTacToeGame />
        </> 
        );
      case 2:
        return (
          <>
            <button className='z-50 underline mt-4 text-lg text-blue-600 hover:text-purple-500' onClick={() => setGameDisplayed(null)}>&lt; Go back</button>
            <CircleGenerator />
          </> 
          );
      case 3:
        return (
          <>
            <button className='z-50 underline mt-4 text-lg text-blue-600 hover:text-purple-500' onClick={() => setGameDisplayed(null)}>&lt; Go back</button>
            <GraphGenerator />
          </> 
          );
      default:
        return (
          <div className='flex flex-col items-center justify-center gap-y-10 min-h-screen'>
            <div className='text-lg'>Choose the Game you want to play : </div>
            <button className='bg-blue-400 text-white p-4 rounded-md hover:scale-125 duration-300 text-xl'  onClick={() => chooseGame(0)}>Chess Game</button>
            <button className='bg-green-400 text-white p-4 rounded-md hover:scale-125 duration-300 text-xl' onClick={() => chooseGame(1)}>Tic tac toe Game</button>
            <button className='bg-orange-400 text-white p-4 rounded-md hover:scale-125 duration-300 text-xl' onClick={() => chooseGame(2)}>Circle generator</button>
            <button className='bg-yellow-400 text-white p-4 rounded-md hover:scale-125 duration-300 text-xl' onClick={() => chooseGame(3)}>Graph generator</button>

          </div>
        );
    }
    
  }

  return (
    <>
      {renderGames()}
    </>
  );
 
  
}

export default App;

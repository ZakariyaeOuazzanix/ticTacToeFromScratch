/*import logo from './logo.svg';
import './App.css';*/
import React, { createContext, useState, useContext } from 'react';
import Board from './Board';
import Square from './Square';







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

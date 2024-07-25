/*import logo from './logo.svg';
import './App.css';*/

function Square(){
  return(
    <div className="w-10 h-10 bg-gray-500"></div>
    
  );
}

function Board(){
  const squares = Array(9).fill(null);
  return(
    <>
      
    <div className="grid grid-cols-3 grid-rows-3 gap-0 w-max">
      {
      squares.map((elt, idx)=>
        <Square key={idx}/>
      )}
    </div>
      

    </>
  );
}

function App() {
  return (
    <>
      <div className="m-10">
        <Board />
          
      </div>
      
    
    </>
    
  );
}

export default App;

import React, { createContext, useState, useContext } from 'react';

export default function CircleGenerator(){
  /*const [circleDiameter, setCircleDiameter] = useState(100);
  const [rgbValue, setRgbValue] = useState([150,150,150]);
  const [leftTopPositionPercentage, setLeftTopPositionPercentage] = useState([20,20]);
*/
  const [randomCircles, setRandomCircles] = useState([
    {
      'circleDiameter' : 100,
      'red' : 150,
      'green' : 150,
      'blue' : 150,
      'left' : 20,
      'top' : 20
    }
  ]);

  function randomBetween(start, end){
    let rdm = Math.round((Math.random() * (end - start)) + start);
    return rdm; 
  }
 
  function generateRandomCircle(){
    let randomCircle = {
      'circleDiameter' : randomBetween(1, 300),
      'red' :  randomBetween(1, 255),
      'green' :  randomBetween(1, 255),
      'blue' :  randomBetween(1, 255),
      'left' :  randomBetween(5, 90),
      'top' :  randomBetween(5, 90)
    }
    return randomCircle;
  }

  function generateRandomCircles(numberToGenerate){
    const newRandomCircles = [];
    for (let i = 0; i< numberToGenerate; i++){
      newRandomCircles.push(generateRandomCircle());
    }
    setRandomCircles(newRandomCircles);
  }

  function generateRandomNbOfCircles(){
    let randomNb = randomBetween(5, 50);
    generateRandomCircles(randomNb);
  }

  return (
    <>
      {
        randomCircles.map((circle, idx) =>
          <div key={idx}
          style={
            {
              left : `${circle['left']}%`,
              top : `${circle['top']}%`,
              width : `${circle['circleDiameter']}px`,
              height : `${circle['circleDiameter']}px`,
              backgroundColor : `rgb(${circle['red']},${circle['green']},${circle['blue']})`
            }
          }
          className="absolute z-10 rounded-full"></div>
        )

      }
          
        
        <button className='z-20 text-red-500 absolute top-[50%] left-[47.5%]' onClick={generateRandomNbOfCircles}>Generate</button>
      
    </>
  );


}
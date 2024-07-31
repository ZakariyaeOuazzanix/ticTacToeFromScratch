import { drawPoint } from "./drawPoint";

//intervalStart && intervalFinish need to be between 0 and 12 using this this way
export default function drawFunction(a, power, b, intervalStart, intervalFinish, color){
  //y = a* x^pow + b
  //let's set a fixed width of for where the function will be drawn of 600px
  // 50px -> 1 in interval units
  let unitToPxRatio = 50; // each unit will have this amount of points (each 50 px will have this many points)
  let PointsToBeDrawn = [];
  let intervalWidth = intervalFinish - intervalStart;
  //let stepSize = intervalWidth / nbPoints;
  let pxStart = intervalStart * unitToPxRatio;
  let pxEnd = intervalWidth *unitToPxRatio;
  let nbPointsToBeDrawn = pxEnd - pxStart + 1;
  let realXStepSize = intervalWidth / nbPointsToBeDrawn;
  let pxStepSize = 50/unitToPxRatio
  for (let x=pxStart, realX = intervalStart; x<pxEnd && realX<intervalFinish; x+=pxStepSize, realX+= realXStepSize){
    let y = a * Math.pow(realX,power) + b; //keeps the form of the curve
    y *= unitToPxRatio;
    console.log('x : ' + x + ', y : ' + y);
    if(x<600 && y<600) // to avoid getting out of the square for drawing functions
    {
      PointsToBeDrawn.push([x, y]); 
    }
  }
  return(
    <>
      {
        PointsToBeDrawn.map((point,idx) => 
        drawPoint(point[0], point[1], color, idx)
      )
      }
      

    </>
  );

}
import { XAxis } from "./XAxis";
import { YAxis } from "./YAxis";
import { drawPoint } from "./drawPoint";
import drawFunction from "./drawFunction";
export default function GraphGenerator(){

  return(
    <>
      <div className="bg-blue-100 h-fit w-fit m-20 relative">
        {drawFunction(1/4,1,2,0,12,'green')}
        <YAxis />
        <XAxis />
      </div>
    </>
  );
}
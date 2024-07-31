export function drawPoint(x, y, color, keyPt){
  return(
    <div key = {keyPt}
      style={{
        //borderRadius : '1px',
        position : 'absolute',
        bottom : `${y}px`,
        left : `${x}px`,
        /*width : `${size}px`,
        height : `${size}px`,*/
        width : '1px',
        height : '1px',
        backgroundColor : `${color}`,
      }}
      
      >
    </div>
  );
}
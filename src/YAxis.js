
export function YAxis(){
  return (
    <>
      <div 
          style={{
            height : '600px',
            width : '3px',
          }}
          className="h-1 bg-black relative">
          <div 
            style={{
              top : '-14px',
              left : '-11.5px',
            }}
            className="absolute font-extrabold text-4xl text-black">^</div>
        </div>
    </>
  );
}
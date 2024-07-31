export function XAxis(){
  return(
    <>
      <div 
          style={{
            width : '600px',
            height : '3px',
          }}
          className="bg-black relative">
          <div 
            style={{
              top : '-23.7px',
            }}
            className="absolute -right-2 font-extrabold text-4xl text-black">&gt;</div>
        </div>
    </>
  );
}
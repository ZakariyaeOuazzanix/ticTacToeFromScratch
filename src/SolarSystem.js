export function SolarSystem(){

  let planets = ["Sun", "Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];

  let planetColors = ["#FFD700", "#A9A9A9", "#FFF8DC", "#1E90FF", "#FF4500", "#FFA500", "#D4AF37", "#AFEEEE", "#4682B4"];

  let planetSizes = [109, 0.38, 0.95, 1.0, 0.53, 11.2, 9.4, 4.0, 3.9];


  function DrawPlanets(){
    return(
      <>
        <div className="mx-auto flex items-center gap-x-5">
        {
          planets.map((planet,idx) =>
          <div class="flex flex-col gap-y-40">
            <div>${planet}</div>
            <div  key={idx}
              style={{
                width: '10px',
                height: '10px',
                backgroundColor:  `${planetColors[idx]}`,
                transform: `scale(${planetSizes[idx]})`,
                borderRadius: '50%',
              }}    
            >
            </div>
          </div>
          )
        }
        </div>
      </>
    );
  }

  function ViewPlanetToPlanetDistance(){
    return(
      <>
      <div className="w-full min-h-screen relative">
        <div 
        style={{ transform: 'scale(8.17)' }}
        className="w-[10px] z-1 absolute left-[50px] top-[500px] h-[10px] rounded-full bg-red-400">
          </div>
          <div
            style={{
              position : 'absolute',
              left : '50px',
              top : '500px',
              width: '10px',
              height: '10px',
              backgroundColor:  'yellow',
              borderRadius: '50%',
              zIndex : '5',
            }} 
            >

          </div>
        

        <div
            style={{
              position : 'absolute',
              left : '1137px',
              top : '500px',
              width: '10px',
              height: '10px',
              backgroundColor:  'black',
              borderRadius: '50%',
              transform: 'scale(0.3)',
            }} 
            >

        </div>
        </div>
      </>
    );


    
  }

  return(
    <>
      <ViewPlanetToPlanetDistance />
    </>
  );
}
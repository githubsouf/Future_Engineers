
// import background from  '@/images/background.jpg'

import Header from "./layout/Header";

export default function Roadmap(){
    return(
   <div>
    <Header/>
    <div className="relative py-36 flex flex-col items-center"
        style={{
          backgroundImage: 'url("https://t4.ftcdn.net/jpg/10/16/79/83/360_F_1016798325_tqBjT4jbp5xMHApKzGRrfuBcJJFIXvP2.jpg")',
         
        }}>
          
      <div className="flex flex-col items-center">
        <div className="bg-white px-6 py-3 rounded-lg shadow-md text-center"
        style={{ backgroundColor:'#fffbeb'}}>
          <p className="font-semibold">Les filières les plus compatibles</p>
        </div>
        
        {/* <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
            <line x1="150" y1="50" x2="150" y2="250" stroke="black" stroke-width="2" stroke-dasharray="5,5" />
            <polygon points="145,250 150,270 155,250" fill="black" />
        </svg> */}

        <svg width="400" height="600" xmlns="http://www.w3.org/2000/svg">

        {/* FOR the right label DONE */}
        <path d="M 330 0 
                C 350 50, 375 75,
                 350 100  
                C 330 125, 350 150,
                 350 175" 
        stroke="black" stroke-width="2" stroke-dasharray="5,5" fill="none" />
        <polygon points="345,175 350,190 355,175" fill="black" />
        
        {/* Third label */}
        <path d="M 270 0 
                 C 330 75, 310 125,
                   300 150
                 C 275 200, 250 250,
                   270 385" 
                stroke="black" stroke-width="2" stroke-dasharray="5,5" fill="none" />
        <polygon points="265,385 270,400 275,385" fill="black" />

        {/* Second label */}
        <path d="M 75 0 
                C 25 75, 50 125,
                 75 150  
                C 100 175, 125 225,
                 75 300" 
        stroke="black" stroke-width="2" stroke-dasharray="5,5" fill="none" />
        
        <polygon points="70,290 75,305 80,290" fill="black" />

        {/* Fourth label */}
        <path d="M 175 0 
                C 100 75, 150 150,
                 175 225  
                C 200 300, 225 350,
                 125 500" 
        stroke="black" stroke-width="2" stroke-dasharray="5,5" fill="none" />
        
        <polygon points="120,495 125,510 130,495" fill="black" />
        {/* Fifth label */}
        <line x1="220" y1="0" x2="220" y2="590" stroke="black" stroke-width="2" stroke-dasharray="5,5" />
        <polygon points="210,580 220,590 230,580" fill="black" />
        </svg>

        <div className="flex justify-between w-full mt-6">
          <div className=" px-6 py-3 rounded-lg shadow-md text-center"
            style={{ position: 'relative', top: '-430px', right: '-450px', backgroundColor:'#fde68a' }}>
            <p className="font-semibold">First Label</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-lg shadow-md text-center"
          style={{ position: 'relative', top: '-320px', right: '35px' }}>
            <p className="font-semibold">Second Label</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-lg shadow-md text-center"
          style={{ position: 'relative', top: '-220px', right: '-110px' }}>
            <p className="font-semibold">Third Label</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-lg shadow-md text-center"
          style={{ position: 'relative', top: '-110px', right: '220px' }}>
            <p className="font-semibold">Fourth Label</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-lg shadow-md text-center"
          style={{ position: 'relative', top: '-30px', right: '240px' }}>
            <p className="font-semibold">Fifth Label</p>
          </div>
        </div>
        
      </div>
    </div>
  </div>     
  );

}
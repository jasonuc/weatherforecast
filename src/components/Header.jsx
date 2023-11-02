import { useEffect, useState } from "react";

function Header() {

  const [headerText, setHeaderText] = useState("Weatheroooo")
  
  useEffect(() => {
    const intervalId = setInterval( 
      () => {
          setHeaderText(prev => {
              switch(prev) {
                case "Weatheroooo":
                  return "Weatherooo"
                case "Weatherooo":
                  return "Weatheroo"
                case "Weatheroo":
                  return "Weathero"
                case "Weathero":
                  return "Weatherooo"
              }
            })
      }, 1500
    )
      
    return () => {
      clearInterval(intervalId)
    }
    
  })


  return (
    <div className=' flex bg-cloud-1 bg-no-repeat bg-cover w-screen h-[4.5rem] md:h-[8rem] lg:text-8xl bg-bottom items-center justify-center text-[3.2rem] italic md:not-italic md:text-5xl font-Inconsolata font-extrabold tracking-wider md:tracking-normal md:font-bold text-coral bg-blend-overlay bg-slate-300'>
        <h1 className="">{headerText}</h1>
    </div>
  )
}

export default Header;
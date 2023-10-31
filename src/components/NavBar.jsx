import { useState, useEffect } from "react";


function NavBar({ location, setLocation }) {
    const placeholderValues = ["Lagos, Nigeria", "New York, USA", "Tokyo, Japan", "London, UK", "Paris, France", "Beijing, China", "Sydney, Australia", "Rio de Janeiro, Brazil", "Moscow, Russia", "Cairo, Egypt", "Mumbai, India"];
    const randomPlaceholder = () => placeholderValues[Math.floor(Math.random() * placeholderValues.length)]
    const [placeholder, setPlaceholder] = useState(randomPlaceholder())

    useEffect(() => {
        const intervalId = setInterval(() => {
            setPlaceholder(randomPlaceholder());
        }, 1500);

        return () => {
            clearInterval(intervalId); // Clear the interval if the component unmounts
        };
    }, []);

    function handleChange({target}) {
        setLocation(target.value)
        console.log("Location is now: " + location)
    }

    return (
        <div className={`h-14 md:h-20 items-center w-screen flex justify-evenly md:justify-center py-2 border-b-2 border-coral border-opacity-10 border-dotted gap-x-2 box-border ${location ? 'flex-row-reverse' : 'flex-row'}`}>
            <button className={`bg-coral text-white h-8 min-w-[5rem] px-4 rounded-md shadow-md hover:shadow-sm text-xs font-bold md:text-base md:font-normal ${location ? "flex-row-reverse" : "flex-row"}`}>
                {location ? "Search" : "My location"}
            </button>
            <input onChange={handleChange} type="text" className=" placeholder:italic border-dotted focus:border-solid box-border border-2 h-8 px-2 md:flex-grow max-w-lg rounded-md font-mono placeholder:text-slate-300" placeholder={placeholder} value={location} />
        </div>
    )

}

export default NavBar;
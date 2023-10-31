import { useState, useEffect } from "react";

function SearchBar({ location, setLocation, weather, setWeather }) {
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

    function handleChange({ target }) {
        setLocation(target.value)
    }

    function handleClick() {
        console.log("Location submitted is: " + location)
        setLocation("")
    }


    return (
        <div className={`h-14 md:h-20 items-center w-screen flex justify-evenly md:justify-center py-2 border-b-4 border-t-4 border-coral border-opacity-10 border-dotted gap-x-2 lg:gap-x-6 box-border ${location ? 'flex-row-reverse' : 'flex-row'}`}>
            <button onClick={handleClick} className={`bg-coral text-white h-8 min-w-[5rem] px-4 rounded-full shadow-md hover:shadow-sm text-xs font-bold md:text-base md:font-normal ${location ? "flex-row-reverse" : "flex-row"}`}>
                {location ? "Search" : "My location"}
            </button>
            <input onChange={handleChange} type="text" className=" shadow-md shadow-coral md:shadow-md md:shadow-gray-400 placeholder:italic border-dotted focus:border-solid box-border border-2 h-8 px-2 md:flex-grow min-w-[18rem] md:max-w-lg rounded-md font-mono placeholder:text-slate-300" placeholder={placeholder} value={location} />
        </div>
    )

}

export default SearchBar;
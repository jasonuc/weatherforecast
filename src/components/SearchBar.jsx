import { useState, useEffect } from "react";
const apiKey = process.env.API_KEY;

function SearchBar({ location, setLocation, weather, setWeather }) {
    const placeholderValues = ["Lagos, Nigeria", "New York, USA", "Tokyo, Japan", "London, UK", "Paris, France", "Beijing, China", "Sydney, Australia", "Rio de Janeiro, Brazil", "Moscow, Russia", "Cairo, Egypt", "Mumbai, India"]
    const randomPlaceholder = () => placeholderValues[Math.floor(Math.random() * placeholderValues.length)];
    const [placeholder, setPlaceholder] = useState(randomPlaceholder());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setPlaceholder(randomPlaceholder());
        }, 2500);

        return () => {
            clearInterval(intervalId); 
        };
    }, []);

    useEffect(() => {
        if (weather) {
            console.log("Weather data updated:", weather);
        }
    }, [weather]);

    function handleChange(event) {
        setLocation(event.target.value);
    }

    function handleClick() {
        if (!location) {
            // If location is empty, use geolocation
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(success, error);
            } else {
                console.log("Geolocation not supported");
            }
        } else if (location) {
            // If location is not empty, use the provided location value
            // Make API call to OpenWeatherMap with the user's input

            // fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=8b825d527f21884aef1062ed6543470a&units=metric`)
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`)
            .then(response => {
                if (!response.ok) {
                    setLocation("")
                    setPlaceholder("Invalid Input!")
                    throw new Error("Invalid location entered");
                }
                response.json()
            })
                .then(data => {
                    setWeather(data);
                    console.log(weather);
                })
                .catch(error => console.log(error));
        }
    }

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const formattedLocation = `${latitude},${longitude}`; // Format as needed
        setLocation(formattedLocation);
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        
        // Make API call to OpenWeatherMap
        // fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8b825d527f21884aef1062ed6543470a&units=metric`)
            .then(response => response.json())
            .then(data => {
                setWeather(data);
                console.log(weather);
            })
            .catch(error => console.log(error));
    }

    function error() {
        console.log("Unable to retrieve your location");
    }

    return (
        <div className={`h-14 md:h-20 items-center w-screen flex justify-evenly md:justify-center py-2 border-b-4 border-t-4 border-coral border-opacity-10 border-dotted gap-x-2 lg:gap-x-6 box-border ${location ? 'flex-row-reverse' : 'flex-row'}`}>
            <button onClick={handleClick} className={`bg-coral text-white h-8 min-w-[5rem] px-4 rounded-full shadow-md hover:shadow-sm text-xs font-bold md:text-base md:font-normal ${location ? "flex-row-reverse" : "flex-row"}`}>
                {location ? "Search" : "My location"}
            </button>
            <input onChange={handleChange} type="text" className=" shadow-md shadow-coral md:shadow-md md:shadow-gray-400 placeholder:italic border-dotted focus:border-solid box-border border-2 h-8 px-2 md:flex-grow min-w-[18rem] md:max-w-lg rounded-md font-mono placeholder:text-slate-300" placeholder={placeholder} value={location} />
        </div>
    );
}

export default SearchBar;

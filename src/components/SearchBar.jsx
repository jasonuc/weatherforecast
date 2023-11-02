/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const weatherApiKey = import.meta.env.VITE_VERCEL_WEATHER_APP_SECURITY_KEY;
const unsplashApiKey = import.meta.env.VITE_VERCEL_UNSPLASH_API_KEY;


function SearchBar({ location, setLocation, weather, setWeather, setImgSrc }) {
    const placeholderValues = ["Lagos, NG", "New York, US", "Tokyo", "London", "Paris", "Beijing", "Sydney, AU", "Rio de Janeiro", "Moscow", "Cairo, EG", "Mumbai"]
    const randomPlaceholder = () => placeholderValues[Math.floor(Math.random() * placeholderValues.length)];
    const [placeholder, setPlaceholder] = useState(randomPlaceholder());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setPlaceholder(randomPlaceholder());
        }, 1500);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    function handleChange(event) {
        setLocation(event.target.value);
    }

    function handleClick() {
        if (!location) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(success, error, { enableHighAccuracy: true })
            } else {
                alert("Geolocation is not supported on this browser.\nYou have to put your location in the search bar.")
                console.error("Geolocation is not supported on this browser.\nYou have to put your location in the search bar.")
            }
        } else {
            const locationArr = location.includes(",") ? location.split(",") : false
            const cityName = locationArr? locationArr[0].trim() : location;
            const countryCode = locationArr ? locationArr[1].trim() : null;
            fetch(locationArr ? `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&appid=${weatherApiKey}&units=metric` : `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherApiKey}&units=metric`)
                .then(response => response.json())
                .then(data => {
                    setWeather(data)
                    fetch(`https://api.unsplash.com/search/photos?query=${data.name}&client_id=${unsplashApiKey}`)
                        .then(response => response.json())
                        .then(unsplashData => {setImgSrc(unsplashData.results[0].urls ? unsplashData.results[0].urls.regular : false)})
                })
        }
    }

    function success(position) {
        const { coords } = position
        const { latitude, longitude } = coords
        const currentPos = `${latitude}, ${longitude}`
        console.log(`Current position: ${currentPos}`)
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                setWeather(data)
                console.log(data.name)
                fetch(`https://api.unsplash.com/search/photos?query=${data.name}&client_id=${unsplashApiKey}`)
                    .then(response => response.json())
                    .then(unsplashData => { console.log(unsplashData); setImgSrc(unsplashData.results[0].urls.regular) })
            })
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`)
    }



    return (
        <div className={`h-14 md:h-20 items-center w-screen flex justify-evenly md:justify-center py-2 border-b-4 border-t-4 border-coral border-opacity-10 border-dotted gap-x-2 lg:gap-x-6 box-border ${location ? 'flex-row-reverse' : 'flex-row'}`}>
            <button onClick={handleClick} className={`bg-coral text-white h-8 min-w-[5rem] px-4 rounded-full shadow-md hover:shadow-sm text-xs font-bold md:text-base md:font-normal ${location ? "flex-row-reverse" : "flex-row"}`}>
                {location ? "Search" : "My location"}
            </button>
            <input onChange={handleChange} type="text" name="user-input" className=" shadow-md shadow-coral md:shadow-md md:shadow-gray-400 placeholder:italic border-dotted focus:border-solid box-border border-2 h-8 px-2 md:flex-grow min-w-[18rem] md:max-w-lg rounded-md font-mono placeholder:text-slate-300" placeholder={placeholder} value={location} />
        </div>
    );
}

export default SearchBar;
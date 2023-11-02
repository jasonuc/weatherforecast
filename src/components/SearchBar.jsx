/* eslint-disable react/prop-types */

const weatherApiKey = import.meta.env.VITE_VERCEL_WEATHER_APP_SECURITY_KEY;
const unsplashApiKey = import.meta.env.VITE_VERCEL_UNSPLASH_API_KEY;
import { useState, useEffect } from "react";

function SearchBar({ location, setLocation, weather, setWeather, setImgSrc }) {
    const placeholderValues = ["Lagos", "New York", "Tokyo", "London", "Paris", "Beijing", "Sydney", "Rio de Janeiro", "Moscow", "Cairo", "Mumbai"]
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
        } else {
            // If location is not empty, use the provided location value...
            // Make API call to OpenWeatherMap with the user's input
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${weatherApiKey}&units=metric`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Invalid input");
                    }
                    return response.json();
                })
                .then(data => {
                    setWeather(data);
                    console.log(weather);

                    // Fetch a random image from Unsplash based on the location
                    fetch(`https://api.unsplash.com/photos/random?query=${encodeURIComponent(location)}&client_id=${unsplashApiKey}`)
                        .then(response => response.json())
                        .then(unsplashData => {
                            if (unsplashData.urls && unsplashData.urls.regular) {
                                setImgSrc(unsplashData.urls.regular); // Set the image source based on Unsplash response
                            }
                        })
                        .catch(error => console.error("Error fetching Unsplash image:", error));

                    setPlaceholder(randomPlaceholder()); // Reset placeholder on successful response
                })
                .catch(error => {
                    console.error(error);
                    setLocation(""); // Clear the input field on error
                    setPlaceholder("Invalid input"); // Set placeholder to "Invalid input"
                });
        }
    }


    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const formattedLocation = `${latitude},${longitude}`; // Format as needed
        setLocation(formattedLocation);
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`)
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
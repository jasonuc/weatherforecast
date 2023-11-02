/* eslint-disable react/prop-types */

function WeatherCard(props) {
    // Destructuring the weather object to extract required data
    const { name, main, weather: weatherDescription, sys } = props.weather;
    const temperature = main.temp;
    const feelsLike = main.feels_like;
    const tempMax = main.temp_max;
    const tempMin = main.temp_min;
    const countryName = sys.country;
    const humidity = main.humidity;
    const weatherTitle = weatherDescription[0].main
    const description = weatherDescription.length > 0 ? weatherDescription[0].description : "";

    return (
        <div className="flex flex-col w-3/4 lg:w-7/12 border-solid border-2 h-[32rem] md:h-[40rem] rounded-md shadow-xl shadow-coral">
            <img
                // src="https://a.cdn-hotels.com/gdcs/production142/d1399/f8f4ac45-1083-49d2-8cfa-1bf5939bc3ac.jpg"
                src={props.imgSrc ? props.imgSrc : "../src/assets/NoImageAvailable.png"}
                alt="Location Image"
                className="h-[12rem] lg:h-[50%] w-[100%] rounded-tl-md rounded-tr-md border-b-2 border-opacity-30 border-dotted border-coral"
            />
            <div className="pt-1 md:pt-3 px-3 md:px-5 flex-grow w-[100%] bg-slate-50 bg-opacity-40">
                <h1 className="text-3xl border-b-2 border-black mb-2 flex items-center justify-between">{`${name}, ${countryName}`}<img className="max-h-1px" src={"http://openweathermap.org/img/w/" + weatherDescription[0].icon + ".png"} /> </h1>
                <p className="font-bold md:text-2xl">
                    🌡️ Temperature: <span className="font-normal italic">{temperature}°C</span>
                </p>
                <p className="font-bold md:text-2xl">
                    Feels like: <span className="font-normal italic">{feelsLike}°C</span>
                </p>
                <p className="font-bold md:text-2xl">
                    Max Temp: <span className="font-normal italic">{tempMax}°C</span>
                </p>
                <p className="font-bold md:text-2xl">
                    Min Temp: <span className="font-normal italic">{tempMin}°C</span>
                </p>
                <p className="font-bold md:text-2xl">
                    Weather forecast: <span className="font-normal italic">{weatherTitle}</span>
                </p>
                <p className="font-bold md:text-2xl">
                    Description: <span className="font-normal italic">{description}</span>
                </p>
                <p className="font-bold md:text-2xl">
                    Humidity: <span className="font-normal italic">{humidity}%</span>
                </p>
            </div>
        </div>
    );
}

export default WeatherCard;


function WeatherCard({city}) {

    function flipACoin() {
        return Math.floor(Math.random() * 2)
    }

    return (
        <div className=" flex flex-col w-3/4 lg:w-7/12 border-solid border-2 h-[32rem] md:h-[40rem] rounded-md shadow-xl shadow-coral">
            <img src="https://a.cdn-hotels.com/gdcs/production142/d1399/f8f4ac45-1083-49d2-8cfa-1bf5939bc3ac.jpg" alt="Location Image" className="h-[12rem] lg:h-[50%] w-[100%] rounded-tl-md rounded-tr-md border-b-2 border-opacity-30 border-dotted border-coral" />
            <div className=" pt-1 md:pt-3 px-3 md:px-5 flex-grow w-[100%] bg-slate-50 bg-opacity-40">
                <h1 className="text-3xl border-b-2 border-black mb-2">{city ? city : "Location Not found"}</h1>
                <p className=" font-bold md:text-2xl ">🌡️ Temperature: <span className=" font-normal italic">20°C</span></p>
                <p className=" font-bold md:text-2xl ">{` ${flipACoin() === 0 ? `🥶` : `🥵`} Feels like: `}<span className=" font-normal italic">20°C</span></p>
                <p className=" font-bold md:text-2xl ">💧 Humidity: <span className=" font-normal italic">{`29` + `%`}</span></p>
                <p className=" font-bold md:text-2xl ">Weather: <span className=" font-normal italic">cloudy</span></p>
                <p className=" font-bold md:text-2xl ">Humidity: <span className=" font-normal italic">87%</span></p>
                <p className=" font-bold md:text-2xl ">Air quality: <span className=" font-normal italic">55%</span></p>
                <p className=" font-bold md:text-2xl ">Air quality: <span className=" font-normal italic">55%°C</span></p>

            </div>
        </div>
    )

}

export default WeatherCard;

export async function getCurrentCity() {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=YOUR_OPENWEATHERMAP_API_KEY`);
                    const data = await response.json();
                    const cityName = data.name;
                    resolve(cityName);
                } catch (error) {
                    reject("Error fetching city name");
                }
            }, () => {
                reject("Geolocation error");
            });
        } else {
            reject("Geolocation not available");
        }
    });
}

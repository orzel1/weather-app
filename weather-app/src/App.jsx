import { useState, useEffect } from "react";
import Forecast from "./components/Forecast";
import CurrentTime from "./components/CurrentTime";

function App() {
  const [city, setCity] = useState("");
  const [tempCity, setTempCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && tempCity.trim() !== "") {
      setCity(tempCity);

      // Konwersja nazwy miasta na geolokalizację za pomocą zewnętrznego API
      const convertCityToCoordinatesUrl = `https://nominatim.openstreetmap.org/search?q=${tempCity}&format=json`;
      fetch(convertCityToCoordinatesUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            const { lat, lon } = data[0];
            console.log("Szerokość geograficzna:", lat);
            console.log("Długość geograficzna:", lon);

            // Pobranie danych o pogodzie z API OpenMeteo
            const ForecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant,relative_humidity_2m_max,relative_humidity_2m_min,weather_code&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m&timezone=Europe%2FWarsaw`;

            fetch(ForecastUrl)
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                setWeatherData(data);
              })
              .catch((error) =>
                console.error("Błąd pobierania danych:", error)
              );
          } else {
            console.log("Nie znaleziono miasta");
          }
        })
        .catch((error) => console.error("Błąd zapytania:", error));
    }
  };

  const getHumidity = (weatherData) => {
    return (
      (weatherData.daily.relative_humidity_2m_max[0] +
        weatherData.daily.relative_humidity_2m_min[0]) /
      2
    );
  };

  // Automatyczne ustawienie miasta na Katowice przy przeładowaniu strony
  useEffect(() => {
    const defaultCity = "Katowice";
    setTempCity(defaultCity);
    setCity(defaultCity);

    const convertCityToCoordinatesUrl = `https://nominatim.openstreetmap.org/search?q=${defaultCity}&format=json`;
    fetch(convertCityToCoordinatesUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const { lat, lon } = data[0];
          console.log("Szerokość geograficzna:", lat);
          console.log("Długość geograficzna:", lon);

          // Pobranie danych o pogodzie z API OpenMeteo
          const ForecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant,relative_humidity_2m_max,relative_humidity_2m_min,weather_code&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m&timezone=Europe%2FWarsaw`;

          fetch(ForecastUrl)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              setWeatherData(data);
            })
            .catch((error) => console.error("Błąd pobierania danych:", error));
        } else {
          console.log("Nie znaleziono miasta");
        }
      })
      .catch((error) => console.error("Błąd zapytania:", error));
  }, []);
  return (
    <>
      <div className="appContainer">
        <main>
          <nav>
            <div className="searchContainer">
              <div className="searchBar">
                <input
                  placeholder="Wpisz lokalizację"
                  type="text"
                  value={tempCity}
                  onChange={(e) => setTempCity(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>
            <div className="timeUnitContainer">
              <CurrentTime />
            </div>
          </nav>
          <section className="weatherForecast">
            <aside className="todayForecast">
              {/* Prognoza pogody na dziś */}
              {weatherData && weatherData.current_weather && (
                <Forecast
                  isToday={true}
                  weatherData={{
                    temperature: weatherData.current_weather.temperature,
                    humidity: getHumidity(weatherData),
                    wind_speed: weatherData.current_weather.windspeed,
                    wind_direction: weatherData.current_weather.winddirection,
                    maxTemp: weatherData.current_weather.temperature,
                    minTemp: weatherData.current_weather.temperature,
                    windSpeed: weatherData.current_weather.windspeed,
                    windDirection: weatherData.current_weather.winddirection,
                    weatherCode: weatherData.current_weather.weathercode,
                  }}
                  city={city}
                />
              )}
            </aside>
            {/* Prognoza pogody na następny tydzień */}
            <section className="nextWeekForecast">
              {weatherData &&
                weatherData.daily &&
                weatherData.daily.temperature_2m_max.map((_, i) => (
                  <Forecast
                    key={i}
                    isToday={false}
                    weatherData={{
                      maxTemp: weatherData.daily.temperature_2m_max[i],
                      minTemp: weatherData.daily.temperature_2m_min[i],
                      windSpeed: weatherData.daily.wind_speed_10m_max[i], // maksymalna prędkość wiatru
                      windDirection:
                        weatherData.daily.wind_direction_10m_dominant[i],
                      weatherCode: weatherData.daily.weather_code[i],
                    }}
                    city={city} // przekazywanie nazwy miasta do wyświetlenia w panelu pogody
                    index={i + 1} // Iterowanie po kolejnych dniach, pozwala ustawić poprawną nazwy dniów w tygodniu
                  />
                ))}
            </section>
          </section>
        </main>
      </div>
    </>
  );
}

export default App;

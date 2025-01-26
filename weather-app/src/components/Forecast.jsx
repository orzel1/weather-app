import SnowImage from "../assets/Snowy.png";
import CloudImage from "../assets/Cloudy.png";
import HailImage from "../assets/Hail.png";
import HumidityImage from "../assets/Humidity.png";
import StormImage from "../assets/Storm.png";
import SunImage from "../assets/Sun.png";
import ThermometerImage_1 from "../assets/Warm.png";
import ThermometerImage_2 from "../assets/Cold.png";
import WindImage from "../assets/Wind.png";
import WindDirection from "../assets/Windy.png";
import CityImage from "../assets/City.png";
import DrizzleImage from "../assets/Drizzle.png";
import FogImage from "../assets/Fog.png";
import HeavyRainImage from "../assets/Heavy_rain.png";
import RainImage from "../assets/Rainy.png";

const Forecast = ({ isToday, weatherData, city, index }) => {
  console.log(weatherData);

  const {
    temperature,
    humidity,
    wind_speed,
    wind_direction,
    maxTemp,
    minTemp,
    windSpeed,
    windDirection,
    weatherCode,
  } = weatherData || {}; // Dekonstrukcja danych przychodzących

  // Przypisanie obrazków w zależności od warunków
  const getWeatherIcon = (weatherCode) => {
    if (weatherCode == 0) {
      return SunImage;
    }
    if (weatherCode >= 1 && weatherCode <= 3) {
      return CloudImage;
    }
    if (weatherCode >= 45 && weatherCode <= 48) {
      return FogImage;
    }
    if (weatherCode >= 51 && weatherCode <= 55) {
      return DrizzleImage;
    }
    if (weatherCode >= 56 && weatherCode <= 57) {
      return FreezingDrizzleImage;
    }
    if (weatherCode >= 61 && weatherCode <= 65) {
      return RainImage;
    }
    if (weatherCode >= 66 && weatherCode <= 67) {
      return RainImage;
    }
    if (weatherCode >= 71 && weatherCode <= 77) {
      return SnowImage;
    }
    if (weatherCode >= 80 && weatherCode <= 82) {
      return HeavyRainImage;
    }
    if (weatherCode >= 85 && weatherCode <= 86) {
      return SnowImage;
    }
    if (weatherCode >= 95 && weatherCode <= 95) {
      return SnowImage;
    }
    if (weatherCode >= 96 && weatherCode <= 99) {
      return StormImage;
    }

    // Jeśli kod nie pasuje do żadnego z powyższych przypadków, zwróć domyślny obrazek
    return DefaultWeatherImage;
  };

  // Dekodowanie kierunku wiatru zgodnie z instrukcją z API openmeteo
  const getWindDirection = (degree) => {
    if (degree >= 337.5 || degree < 22.5) return "Północ";
    if (degree >= 22.5 && degree < 67.5) return "Północny wschód";
    if (degree >= 67.5 && degree < 112.5) return "Wschód";
    if (degree >= 112.5 && degree < 157.5) return "Południowy wschód";
    if (degree >= 157.5 && degree < 202.5) return "Południe";
    if (degree >= 202.5 && degree < 247.5) return "Południowy zachód";
    if (degree >= 247.5 && degree < 292.5) return "Zachód";
    if (degree >= 292.5 && degree < 337.5) return "Północny zachód";
  };

  // Przypisawnie nazw następnych dni w prognozie
  const getDayName = (index) => {
    const days = [
      "Niedziela",
      "Poniedziałek",
      "Wtorek",
      "Środa",
      "Czwartek",
      "Piątek",
      "Sobota",
    ];

    // Indeks dnia: 0 to obecny dzień, 1 to dzień następny...
    const today = new Date();
    const dayOfWeek = (today.getDay() + index) % 7; // Uwzględnia zmiany dni przy mapowaniu
    return days[dayOfWeek];
  };

  return (
    <div className={`forecast ${isToday ? "today" : "week"}`}>
      <div className="forecastContainer">
        <div className="forecastImage">
          <img src={getWeatherIcon(weatherCode)} alt="weather icon" />
        </div>
        <div className="dayOfTheWeek">
          {isToday ? "Dzisiaj" : getDayName(index)}{" "}
        </div>
        <div className="location">
          {isToday && (
            <>
              <img src={CityImage} alt="City" />
              <span>{city}</span>
            </>
          )}
        </div>

        <div className="temperature">
          {isToday ? (
            <>
              <img src={ThermometerImage_1} alt="Thermometer" />
              <span>{temperature}°C</span>
            </>
          ) : (
            <>
              <div className="minMaxTemps">
                <div className="maxTemp">
                  <img src={ThermometerImage_1} alt="Thermometer Max" />
                  <span>Max: {maxTemp}°C</span>
                </div>
                <div className="minTemp">
                  <img src={ThermometerImage_2} alt="Thermometer Min" />
                  <span>Min: {minTemp}°C</span>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="humidity">
          {isToday && (
            <>
              <img src={HumidityImage} alt="Humidity" />
              <span>{Math.round(humidity)}%</span>
            </>
          )}
        </div>

        <div className="windSpeed">
          <img src={WindImage} alt="Wind speed" />
          {isToday
            ? `${Math.round(wind_speed)} km/h`
            : `${Math.round(windSpeed)} km/h`}
        </div>
        <div className="windDirection">
          <img src={WindDirection} alt="Wind direction" />
          {isToday
            ? getWindDirection(windDirection)
            : getWindDirection(windDirection)}
        </div>
      </div>
    </div>
  );
};

export default Forecast;

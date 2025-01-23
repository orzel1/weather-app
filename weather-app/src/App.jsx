//import React from "react";
import { useState } from "react";
// const App = () => {
//   return (
//     <div>
//       <h1>Hello, wofsdddfsrld!</h1>
//     </div>
//   );
// };

function App() {
  const url = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m";
  return (
    <>
       <div className="container">
        <main>
          <div className="searchBar">
            <p>searchbar</p>
          </div>
          <div className="temperatureUnit"></div>
          <div className="weatherPanel"> </div>
          <div className="atmosphereImg"></div>
          <div className="location"></div>
          <div className="temperature"></div>
          <div className="humidity"></div>
          <div className="windSpeed"></div>
          <div className="windDirection"></div>
        </main>
       </div>
    </>
  );
};

export default App;

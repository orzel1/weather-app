import { useState } from "react";
import { useEffect } from "react";

const CurrentTime = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    setInterval(() => setTime(new Date()), 1000);
  });
  return (
    <>
      <div className="dateTimeContainer">
        <div className="date">
          <p className="day">{time.getDate() + "-"}</p>
          <p className="month">{time.getMonth() + 1 + "-"}</p>
          <p className="year">{time.getFullYear()}</p>
        </div>
        <div className="time">
          <p className="hour">{time.getHours() + ":"}</p>
          <p className="minute">{time.getMinutes() + ":"}</p>
          <p className="second">{time.getSeconds()}</p>
        </div>
      </div>
    </>
  );
};

export default CurrentTime;

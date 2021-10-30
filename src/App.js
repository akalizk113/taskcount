import { useState, useRef } from 'react';

import { Content } from './components';

import './App.css';

function App() {
   const [isStarted, setIsStarted] = useState(false);
   const [workedTime, setWorkedTime] = useState();
   const [totalWorkedTime, setTotalWorkedTime] = useState();
   const [timeSetting, setTimeSetting] = useState({});
   const time = useRef();

   const elapsedTime = (elapsed) => {
      const msPerMinute = 60 * 1000;
      const msPerHour = 60 * 60 * 1000;

      if (elapsed < msPerMinute) {
         return Math.round(elapsed / 1000) + ' seconds';
      } else if (elapsed < msPerHour) {
         return Math.round(elapsed / msPerMinute) + ' minutes';
      } else {
         return (
            Math.floor(elapsed / msPerHour) +
            ' hours ' +
            Math.round((elapsed % msPerHour) / msPerMinute) +
            ' minutes'
         );
      }
   };

   const handleClick = () => {
      setIsStarted(!isStarted);
      if (isStarted === false) {
         time.current = Date.now();
         setWorkedTime();
      } else {
         setWorkedTime(Date.now() - time.current);
      }
   };

   const handleUpdateWorkedTime = () => {
      const prevWorkedTime = JSON.parse(
         localStorage.getItem('totalWorkedTime')
      );
      const newWorkedTime = prevWorkedTime
         ? prevWorkedTime + workedTime
         : workedTime;
      localStorage.setItem('totalWorkedTime', JSON.stringify(newWorkedTime));
      setTotalWorkedTime(newWorkedTime);
      setWorkedTime();
   };

   const handleGetTotalWorkedTime = () => {
      const item = JSON.parse(localStorage.getItem('totalWorkedTime'));
      item && setTotalWorkedTime(item);
   };

   const handleSetTotalWorkedTime = (e) => {
      const hours = Number(timeSetting.h) || 0;
      const minutes = Number(timeSetting.m) || 0;
      if (hours !== 0 || minutes !== 0) {
         console.log(hours, minutes);
         const time = hours * 3600000 + minutes * 60000;
         localStorage.setItem('totalWorkedTime', JSON.stringify(time));
         // console.log(time);
         setTotalWorkedTime(time);
         setTimeSetting(() => {
            return {
               h: ``,
               m: ``,
            };
         });
      } else {
         e.preventDefault();
      }
   };

   return (
      <div className="App">
         <button
            className={isStarted ? 'btn btn--danger' : 'btn'}
            onClick={handleClick}
         >
            {isStarted ? 'stop' : 'start'}
         </button>
         {isStarted && <Content elapsedTime={elapsedTime} />}
         {workedTime && <h2>Worked Time: {elapsedTime(workedTime)}</h2>}

         {!isStarted && workedTime && (
            <button className="btn mt-16" onClick={handleUpdateWorkedTime}>
               Update Total Worked Time
            </button>
         )}

         <button className="btn mt-16" onClick={handleGetTotalWorkedTime}>
            Get Total Worked Time
         </button>

         {totalWorkedTime && (
            <h2>Total Worked Time: {elapsedTime(totalWorkedTime)}</h2>
         )}

         <button className="btn mt-16" onClick={handleSetTotalWorkedTime}>
            Set Total Worked Time
         </button>
         <input
            className="time-input mt-16"
            type="number"
            placeholder="Hours"
            value={timeSetting.h || ``}
            onChange={(e) => {
               setTimeSetting(() => {
                  return {
                     ...timeSetting,
                     h: e.target.value,
                  };
               });
            }}
         />
         <input
            className="time-input mt-16"
            type="number"
            placeholder="Minutes"
            value={timeSetting.m || ``}
            onChange={(e) => {
               setTimeSetting(() => {
                  return {
                     ...timeSetting,
                     m: e.target.value,
                  };
               });
            }}
         />
      </div>
   );
}

export default App;

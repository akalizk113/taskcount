import React, { useState } from 'react';

function TimeControl({ isStarted, workedTime, setWorkedTime, elapsedTime }) {
   const [totalWorkedTime, setTotalWorkedTime] = useState();
   const [timeSetting, setTimeSetting] = useState({});

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
         const time = hours * 3600000 + minutes * 60000;
         localStorage.setItem('totalWorkedTime', JSON.stringify(time));
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
      <div>
         {!isStarted && workedTime && (
            <button className="btn mt-16" onClick={handleUpdateWorkedTime}>
               Update To Total Worked Time
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

export default TimeControl;

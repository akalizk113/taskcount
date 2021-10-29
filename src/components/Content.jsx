import React, { useState, useRef, useEffect } from 'react';

import './Content.css';

function Content() {
   const [timer, setTimer] = useState(0);
   const [taskCount, setTaskCount] = useState(0);
   const intervalId = useRef();

   useEffect(() => {
      return () => {
         intervalId && clearInterval(intervalId.current);
      };
   }, []);

   const handleStart = (e) => {
      if (intervalId.current === undefined) {
         intervalId.current = setInterval(() => {
            setTimer((prev) => prev + 1);
         }, 1000);
      } else {
         e.preventDefault();
      }
   };
   const handlePause = () => {
      clearInterval(intervalId.current);
      intervalId.current = undefined;
   };
   const handleNext = () => {
      setTimer(0);
      setTaskCount((prev) => prev + 1);
   };

   const handleChangeCount = (value) => {
      setTaskCount(Number(value));
   };
   return (
      <div className="Content">
         <div className="timer-container">
            <h3 className="timer-heading">Time</h3>
            <button className="timer-btn" onClick={handleStart}>
               Run
            </button>
            <button
               className="timer-btn timer-btn--warning"
               onClick={handlePause}
            >
               Pause
            </button>
            <span className="timer-count">{timer}</span>
            <button
               className="timer-btn timer-btn--success"
               onClick={handleNext}
            >
               Next
            </button>
         </div>
         <div className="task-count-container">
            <h3 className="task-count-heading">Task: </h3>
            <input
               type="number"
               className="task-count-counter"
               value={taskCount}
               onChange={(e) => {
                  handleChangeCount(e.target.value);
               }}
            />
         </div>
      </div>
   );
}

export default Content;

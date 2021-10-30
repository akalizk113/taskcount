import { useState, useRef } from 'react';

import { Content, TimeControl } from './components';

import './App.css';

function App() {
   const [isStarted, setIsStarted] = useState(false);
   const [workedTime, setWorkedTime] = useState();

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

         <TimeControl
            isStarted={isStarted}
            workedTime={workedTime}
            setWorkedTime={setWorkedTime}
            elapsedTime={elapsedTime}
         />
      </div>
   );
}

export default App;

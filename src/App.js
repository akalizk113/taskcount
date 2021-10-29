import { useState, useRef } from 'react';

import { Content } from './components';

import './App.css';

function App() {
   const [isStarted, setIsStarted] = useState(false);
   const [workedTime, setWorkedTime] = useState();

   const time = useRef();

   const getWorkedTime = (current, previous) => {
      const msPerMinute = 60 * 1000;

      const elapsed = current - previous;

      if (elapsed < msPerMinute) {
         return Math.round(elapsed / 1000) + ' seconds';
      } else {
         return Math.round(elapsed / msPerMinute) + ' minutes';
      }
   };

   const handleClick = () => {
      setIsStarted(!isStarted);
      if (isStarted === false) {
         time.current = Date.now();
         setWorkedTime();
      } else {
         setWorkedTime(getWorkedTime(Date.now(), time.current));
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
         {isStarted && <Content />}
         {workedTime && <h2>Worked Time: {workedTime}</h2>}
      </div>
   );
}

export default App;

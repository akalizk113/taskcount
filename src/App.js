import { useState } from 'react';

import { WorkingTimeCounter, Toasts, Logs } from './components';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

function App() {
   const [isStartedWorking, setStartedWorking] = useState(false);
   const [toast, setToast] = useState({
      setShow(boolean) {
         setToast({
            ...toast,
            show: boolean,
         });
      },
      show: false,
   });

   const [logsShow, setLogsShow] = useState(false);
   return (
      <div className="App">
         <nav className="d-flex flex-column">
            <Button
               style={{ minWidth: 'max-content' }}
               variant={isStartedWorking ? 'outline-primary' : 'primary'}
               disabled={isStartedWorking || logsShow}
               onClick={() => setStartedWorking(true)}
            >
               {isStartedWorking ? 'Working . . .' : 'Start to work'}
            </Button>

            <Button
               className="mt-3"
               style={{ minWidth: 'max-content' }}
               variant={logsShow ? 'outline-danger' : 'outline-primary'}
               disabled={isStartedWorking}
               onClick={() => setLogsShow((prev) => !prev)}
            >
               {logsShow ? 'Close' : 'Logs'}
            </Button>
         </nav>

         {isStartedWorking && (
            <WorkingTimeCounter
               setStartedWorking={setStartedWorking}
               setToast={setToast}
            />
         )}

         {logsShow && <Logs setToast={setToast} />}

         {toast.show && (
            <Toasts
               setShow={toast.setShow}
               variant={toast.variant}
               title={toast.title}
               message={toast.message}
               delay={toast.delay}
            />
         )}
      </div>
   );
}

export default App;

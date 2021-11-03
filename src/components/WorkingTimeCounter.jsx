import { useRef, useState, useEffect, memo } from 'react';
import { elapsedTime } from '../constant/function';

import { Button, Container, Row, Col, Modal } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

function WorkingTimeCounter(props) {
   const { setStartedWorking, setToast } = props;
   const [isWorking, setWorking] = useState(true);
   const [taskTimer, setTaskTimer] = useState(0);
   const [taskCount, setTaskCount] = useState(0);
   const [workingTime, setWorkingTime] = useState(0);
   const [modalShow, setModalShow] = useState(false);
   const [logTime, setLogTime] = useState({
      startTime: new Date().toLocaleString('en-GB'),
   });

   const timerInterval = useRef();

   useEffect(() => {
      timerInterval.current = setInterval(() => {
         if (isWorking) {
            setTaskTimer((prev) => prev + 1);
            setWorkingTime((prev) => prev + 1000);
         }
      }, 1000);

      return () => clearInterval(timerInterval.current);
   }, [isWorking]);

   const handleFinishClick = () => {
      setWorking(false);
      setModalShow(true);
      setLogTime((prev) => {
         return {
            ...prev,
            finishTime: new Date().toLocaleString('en-GB'),
         };
      });
   };

   const handleNextClick = () => {
      setTaskTimer(0);
      setTaskCount((prev) => prev + 1);
   };

   const handleSaveLog = () => {
      const newLog = {
         startTime: logTime.startTime,
         finishTime: logTime.finishTime,
         workedTime: workingTime,
         task: taskCount,
      };
      const prevLogs = JSON.parse(localStorage.getItem('logs')) || [];
      const newLogs = [...prevLogs, newLog];
      localStorage.setItem('logs', JSON.stringify(newLogs));
      setToast((prev) => {
         return {
            ...prev,
            show: true,
            variant: 'success',
            delay: 5000,
            title: 'Saved',
            message: 'Successfully saved to LocalStorage',
         };
      });
      setStartedWorking(false);
   };

   return (
      <div className="d-flex">
         <div className="ms-3 d-flex flex-grow-1 flex-wrap">
            <Button
               className="d-inline-flex align-items-center"
               variant={isWorking === false ? 'warning' : 'outline-warning'}
               onClick={() => setWorking((prev) => !prev)}
            >
               {isWorking === false ? (
                  <Icon.CaretRightFill className="me-1" />
               ) : (
                  <Icon.PauseFill className="me-1" />
               )}
               {isWorking === false ? 'Resume' : 'Pause'}
            </Button>

            <Button
               className="ms-auto"
               variant="outline-danger"
               onClick={handleFinishClick}
            >
               Finish work
            </Button>
            <Container className="mt-4">
               <Row>
                  <Col className="text-center">
                     <h6>Task Timer</h6>
                     <p className="mt-3 fw-bold fs-3">{taskTimer}</p>
                     <Button
                        size="sm"
                        variant="outline-success"
                        onClick={handleNextClick}
                     >
                        Next
                     </Button>
                  </Col>
                  <Col className="text-center">
                     <h6>Task Counter</h6>
                     <input
                        type="number"
                        style={{ width: '100%' }}
                        className="p-0 my-3 fw-bold fs-3 border-0 text-center d-block"
                        value={taskCount}
                        onChange={(e) => setTaskCount(Number(e.target.value))}
                     />
                  </Col>
               </Row>

               <Row>
                  <Col className="mt-4">
                     <h5>
                        Working Time:
                        <span className="ms-2">{elapsedTime(workingTime)}</span>
                     </h5>
                  </Col>
               </Row>
            </Container>
         </div>
         <Modal show={modalShow} onHide={() => setModalShow(false)}>
            <Modal.Header closeButton>
               <Modal.Title>Recent Log</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <ul className="recent-log">
                  <li>
                     Start Time:
                     <span className="ms-2 fw-bold">{logTime.startTime}</span>
                  </li>
                  <li>
                     Finish Time:
                     <span className="ms-2 fw-bold">{logTime.finishTime}</span>
                  </li>
                  <li>
                     Worked Time:
                     <span className="ms-2 fw-bold">
                        {elapsedTime(workingTime)}
                     </span>
                  </li>
                  <li>
                     Task: <span className="ms-2 fw-bold">{taskCount}</span>
                  </li>
               </ul>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={() => setModalShow(false)}>
                  Close
               </Button>
               <Button
                  variant="danger"
                  onClick={() => setStartedWorking(false)}
               >
                  Don't Save
               </Button>
               <Button variant="primary" onClick={handleSaveLog}>
                  Save Log
               </Button>
            </Modal.Footer>
         </Modal>
      </div>
   );
}

export default memo(WorkingTimeCounter);

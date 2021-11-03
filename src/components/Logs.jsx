import { useState } from 'react';

import { elapsedTime } from '../constant/function';

import { Table, DropdownButton, Dropdown, Button } from 'react-bootstrap';

function Logs(props) {
   const { setToast } = props;
   const [logs, setLogs] = useState(() => {
      const prevLogs = JSON.parse(localStorage.getItem('logs'));
      return prevLogs || [];
   });

   const [totalWorkedTime, setTotalWorkedTime] = useState(() =>
      logs.reduce((acc, log) => acc + log.workedTime, 0)
   );

   const handleDeleteLog = (index) => {
      setLogs((prev) => {
         const logs = [...prev];
         logs.splice(index, 1);
         setTotalWorkedTime(logs.reduce((acc, log) => acc + log.workedTime, 0));
         return logs;
      });
   };

   const handleSave = () => {
      localStorage.setItem('logs', JSON.stringify(logs));
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
   };
   return (
      <div className="ms-3 flex-grow-1 d-flex flex-column">
         <Table striped bordered hover>
            <thead>
               <tr>
                  <th>Start Time</th>
                  <th>Finish Time</th>
                  <th>Worked Time</th>
                  <th>Task</th>
               </tr>
            </thead>
            <tbody>
               {logs.map((log, index) => (
                  <tr key={index}>
                     <td>{log.startTime}</td>
                     <td>{log.finishTime}</td>
                     <td>{elapsedTime(log.workedTime)}</td>
                     <td className="d-flex">
                        {log.task}
                        <DropdownButton
                           className="ms-auto me-3"
                           variant="transparent"
                           title=""
                           size="md"
                        >
                           <Dropdown.Item
                              onClick={() => handleDeleteLog(index)}
                           >
                              Delete
                           </Dropdown.Item>
                           <Dropdown.Item>Option 2</Dropdown.Item>
                           <Dropdown.Item>Option 3</Dropdown.Item>
                           <Dropdown.Item>Option ...</Dropdown.Item>
                        </DropdownButton>
                     </td>
                  </tr>
               ))}
            </tbody>
         </Table>

         <h4>
            Total Worked Time: <strong>{elapsedTime(totalWorkedTime)}</strong>
         </h4>

         <Button onClick={handleSave} className="ms-auto me-3">
            Save
         </Button>
      </div>
   );
}

export default Logs;

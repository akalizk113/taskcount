import { Toast } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

function Toasts(props) {
   const { variant, title, message, setShow, delay } = props;
   return (
      <Toast
         className="d-inline-block m-1 toast"
         bg={variant || 'primary'}
         delay={delay || 3000}
         autohide
         onClose={() => setShow(false)}
      >
         <Toast.Header>
            <Icon.CheckLg className="me-2" color={variant || 'primary'} />
            <strong className="me-auto">{title || 'title'}</strong>
         </Toast.Header>
         <Toast.Body className={variant === 'Dark' && 'text-white'}>
            {message || 'message'}
         </Toast.Body>
      </Toast>
   );
}

export default Toasts;
